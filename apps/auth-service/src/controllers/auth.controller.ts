import { AuthError, ValidationError } from '@packages/error-handler';
import prisma from '@packages/libs/prisma';
import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import {
	checkOTPRestrictions,
	generateUserAccessToken,
	generateUserRefreshToken,
	getInputsForLoginUser,
	getInputsForRegisterUser,
	getInputsForVerifyUser,
	sendOTP,
	trackOTPRequests,
	userExists,
	verifyOTP
} from '../utils/auth.helper';
import { setCookie } from '../utils/cookies';

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
		const { email, password } = getInputsForLoginUser(req.body);

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
