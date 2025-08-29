import { ValidationError } from '@packages/error-handler';
import {
	LoginUserInputs,
	RegisterUserInputs,
	VerifyUserInputs
} from '../../types/auth.types';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const inputsForRegisterUser = (
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

export const inputsForVerifyUser = (inputs: VerifyUserInputs) => {
	const { name, email, password, otp } = inputs;
	if (!name || !email || !password || !otp)
		throw new ValidationError('All fields are required!');

	return inputs;
};

export const inputsForLoginUser = (inputs: LoginUserInputs) => {
	const { email, password } = inputs;

	if (!email || !password)
		throw new ValidationError('Email and password are required!');

	return inputs;
};
