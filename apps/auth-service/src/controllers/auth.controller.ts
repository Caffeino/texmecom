import { AuthError, ValidationError } from '@packages/error-handler';
import prisma from '@packages/libs/prisma';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import {
	checkOTPRestrictions,
	generateUserAccessToken,
	generateUserRefreshToken,
	sendOTP,
	trackOTPRequests,
	userExists,
	verifyOTP
} from '../utils/auth.helper';
import { setCookie } from '../utils/cookies';
import {
	inputsForLoginUser,
	inputsForRegisterUser,
	inputsForVerifyUser
} from '../utils/validator';

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
		const { name, email } = inputsForRegisterUser(req.body, 'user');

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
		const { name, email, password, otp } = inputsForVerifyUser(req.body);

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

/**
 * Login User
 * @route POST /api/auth/login
 * @access Public
 * @param req
 * @param res
 * @param next
 */
export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, password } = inputsForLoginUser(req.body);

		const user = await userExists(email);

		if (!user) return next(new AuthError(`User doesn't exists!`));

		const isMatch = await bcrypt.compare(password, user.password ?? '');

		if (!isMatch) return next(new AuthError('Invalid email or password!'));

		// Generate  access and refresh token
		const accessToken = generateUserAccessToken(user.id);
		const refreshToken = generateUserRefreshToken(user.id);

		// Store the access and refresh token in a httpOnly secure cookie.
		setCookie(res, 'access_token', accessToken);
		setCookie(res, 'refresh_token', refreshToken);

		res.status(200).json({
			message: 'Login successful!',
			user: { id: user.id, name: user.name, email: user.email }
		});
	} catch (error) {
		return next(error);
	}
};

/**
 * Used to send an OTP email.
 * @route POST /api/auth/forgot-pass
 * @access Public
 * @param req
 * @param res
 * @param next
 * @returns
 */
export const userForgotPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email } = req.body;

		if (!email) return next(new ValidationError('Email is required!'));

		const user = await userExists(email);

		if (!user) return next(new ValidationError('User not found'));

		await checkOTPRestrictions(email);

		await trackOTPRequests(email);

		// Generate OTP and send email
		await sendOTP(user.name, user.email, 'forgot-pass-user-mail');

		res
			.status(200)
			.json({ message: 'OTP sent to email. Please verify your account.' });
	} catch (error) {
		return next(error);
	}
};
