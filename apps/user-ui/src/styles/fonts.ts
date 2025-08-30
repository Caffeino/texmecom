import { Poppins, Roboto } from 'next/font/google';

export const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	style: ['normal', 'italic'],
	variable: '--font-poppins'
});

export const roboto = Roboto({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '700'],
	style: ['normal', 'italic'],
	variable: '--font-roboto'
});
