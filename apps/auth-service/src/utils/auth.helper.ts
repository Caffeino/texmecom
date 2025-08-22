import { ValidationError } from '@packages/error-handler';
import prisma from '@packages/libs/prisma';
import redis from '@packages/libs/redis';
import crypto from 'crypto';
import { RegisterUserInputs, VerifyUserInputs } from '../types/auth.types';
import { sendEmail } from './mailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getInputsForRegisterUser = (
	inputs: RegisterUserInputs,
	userType: 'user' | 'seller'
) => {
	const { name, email, password, phone_number, country } = inputs;

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

	return inputs;
};

export const getInputsForVerifyUser = (inputs: VerifyUserInputs) => {
	const { name, email, password, otp } = inputs;
	if (!name || !email || !password || !otp)
		throw new ValidationError('All fields are required!');

	return inputs;
};

export const userExists = async (email: string) => {
	const exists = await prisma.users.findUnique({
		where: { email }
	});

	return exists ? true : false;
};

export const checkOTPRestrictions = async (email: string) => {
	if (await redis.get(`otp_lock:${email}`)) {
		throw new ValidationError(
			'Account locked due to multiple failed attempts! Try again after 30 minutes.'
		);
	}

	if (await redis.get(`otp_spam_lock:${email}`)) {
		throw new ValidationError(
			'Too many OTP requests! Please wait 1 hour before requesting again.'
		);
	}

	if (await redis.get(`otp_cooldown:${email}`)) {
		throw new ValidationError(
			'Please wait 1 minute before requesting a new OTP.'
		);
	}
};

export const trackOTPRequests = async (email: string) => {
	const otpRequestKey = `otp_request_count:${email}`;
	const otpRequestCount = parseInt((await redis.get(otpRequestKey)) || '0');

	if (otpRequestCount >= 2) {
		await redis.set(`otp_spam_lock:${email}`, 'locked', 'EX', 3600); // Lock for 1Hr
		throw new ValidationError(
			'Too many OTP requests! Please wait 1 hour before requesting again.'
		);
	}

	// Set OTP request count + 1 and track requests for 1Hr
	await redis.set(otpRequestKey, otpRequestCount + 1, 'EX', 3600);
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

export const verifyOTP = async (email: string, otp: string) => {
	const storedOTP = await redis.get(`otp:${email}`);

	if (!storedOTP) throw new ValidationError('Invalid or expired OTP!');

	const failedAttemptsKey = `otp_attempts:${email}`;
	const failedAttempts = parseInt((await redis.get(failedAttemptsKey)) || '0');

	if (storedOTP !== otp) {
		if (failedAttempts >= 2) {
			await redis.set(`otp_lock:${email}`, 'locked', 'EX', 1800); // Locl for 30 mins.
			await redis.del(`otp:${email}`, failedAttemptsKey);

			throw new ValidationError(
				'Too many failed attempts. Your account is locked for 30 minutes!'
			);
		}

		// Set failed attemps count + 1 and wait 5 minutos for new attemp
		await redis.set(failedAttemptsKey, failedAttempts + 1, 'EX', 300);
		throw new ValidationError(
			`Incorrect OTP. ${2 - failedAttempts} attempts left.`
		);
	}

	await redis.del(`otp:${email}`, failedAttemptsKey);
};
