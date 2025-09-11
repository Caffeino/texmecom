import Header from '../components/common/Header';
import { poppins } from '../styles/fonts';
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
			<body className={`${poppins.className} antialiased bg-slate-100`}>
				<Header />
				<div className='w-full py-4'>{children}</div>
			</body>
		</html>
	);
}
