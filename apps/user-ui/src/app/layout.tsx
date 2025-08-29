import './global.css';

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
			<body>{children}</body>
		</html>
	);
}
