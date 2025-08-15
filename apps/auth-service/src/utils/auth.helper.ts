import crypto from 'crypto';
import { NextFunction } from 'express';
import { ValidationError } from '../../../../packages/error-handler';
import redis from '../../../../packages/libs/redis';
import { sendEmail } from './mailer';

type RegistrationData = {
	name: string;
	email: string;
	password: string;
	phone_number?: number;
	country?: number;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistrationData = (
	data: RegistrationData,
	userType: 'user' | 'seller'
) => {
	const { name, email, password, phone_number, country } = data;

	if (!name || !email || !password)
		throw new ValidationError('Missing required fields!');

	if (!emailRegex.test(email))
		throw new ValidationError('Invalid email format!');

	switch (userType) {
		case 'seller':
			if (!phone_number || !country)
				throw new ValidationError('Missing required fields!');
			break;
		default:
			break;
	}
};

export const checkOTPRestrictions = async (
	email: string,
	next: NextFunction
) => {
	if (await redis.get(`otp_lock:${email}`)) {
		return next(
			new ValidationError(
				'Account locked due to multiple failed attempts! Try again after 30 minutes.'
			)
		);
	}

	if (await redis.get(`otp_spam_lock:${email}`)) {
		return next(
			new ValidationError(
				'Too many OTP requests! Please wait 1 hour before requesting again.'
			)
		);
	}

	if (await redis.get(`otp_cooldown:${email}`)) {
		return next(
			new ValidationError('Please wait 1 minute before requesting a new OTP.')
		);
	}
};

export const trackOTPRequests = async (email: string, next: NextFunction) => {
	const otpRequestKey = `otp_request_count:${email}`;
	let otpRequestCount = parseInt((await redis.get(otpRequestKey)) || '0');

	if (otpRequestCount >= 2) {
		await redis.set(`otp_spam_lock:${email}`, 'locked', 'EX', 3600); // Lock for 1Hr
		return next(
			new ValidationError(
				'Too many OTP requests! Please wait 1 hour before requesting again.'
			)
		);
	}

	otpRequestCount += 1;
	// Set OTP request count + 1 and track requests for 1Hr
	await redis.set(otpRequestKey, otpRequestCount, 'EX', 3600);
};

export const sendOTP = async (
	name: string,
	email: string,
	template: string
) => {
	const otp = crypto.randomInt(1000, 9999).toString();

	await sendEmail(email, 'Verify your email', template, { name, otp });

	await redis.set(`otp:${email}`, otp, 'EX', 300);
	await redis.set(`otp_cooldown:${email}`, 'true', 'EX', 60);
};
