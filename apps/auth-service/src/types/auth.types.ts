export type RegisterUserInputs = {
	name: string;
	email: string;
	password: string;
	phone_number?: number;
	country?: number;
};

export type VerifyUserInputs = {
	name: string;
	email: string;
	password: string;
	otp: string;
};
