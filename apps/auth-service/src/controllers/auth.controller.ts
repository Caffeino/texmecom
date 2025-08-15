import { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../../../packages/error-handler';
import prisma from '../../../../packages/libs/prisma';
import {
	checkOTPRestrictions,
	validateRegistrationData
} from '../utils/auth.helper';

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	validateRegistrationData(req.body, 'user');

	const { email } = req.body;

	const userExists = await prisma.users.findUnique({ where: email });

	if (userExists)
		return next(new ValidationError('User already exists with this email!'));

	await checkOTPRestrictions(email, next);
};
