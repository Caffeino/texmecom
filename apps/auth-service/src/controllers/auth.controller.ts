import { ValidationError } from '@packages/error-handler';
import prisma from '@packages/libs/prisma';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import {
	checkOTPRestrictions,
	getInputsForRegisterUser,
	getInputsForVerifyUser,
	sendOTP,
	trackOTPRequests,
	userExists,
	verifyOTP
} from '../utils/auth.helper';

/**
 * Allow the register of a new user.
 * @route POST /api/auth/register
 * @access Public
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, email } = getInputsForRegisterUser(req.body, 'user');

		if (await userExists(email))
			return next(new ValidationError('User already exists with this email'));

		await checkOTPRestrictions(email);
		await trackOTPRequests(email);
		await sendOTP(name, email, 'user-activation-mail');

		res.status(200).json({
			message: 'OTP sent to email. Please verify your account.'
		});
	} catch (error) {
		return next(error);
	}
};

/**
 * Verify the user with OTP.
 * @route POST /api/auth/verify
 * @access Public
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const verifyUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { name, email, password, otp } = getInputsForVerifyUser(req.body);

		if (await userExists(email))
			return next(new ValidationError('User already exists with this email'));

		await verifyOTP(email, otp);

		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		await prisma.users.create({
			data: { name, email, password: hashedPassword }
		});

		return res.status(201).json({
			success: true,
			message: 'User registered successfully!'
		});
	} catch (error) {
		return next(error);
	}
};
