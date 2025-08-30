import Header from '../components/common/Header';
import { poppins, roboto } from '../styles/fonts';
import './../styles/global.css';

export const metadata = {
	title: 'Texmecom',
	description:
		'Texmecom is a ecommerce shop made with love for the Texmelucan community'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.variable} ${poppins.variable}`}>
				<Header />
				{children}
			</body>
		</html>
	);
}
