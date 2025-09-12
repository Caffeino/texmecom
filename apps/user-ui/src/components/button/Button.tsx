import type { ButtonHTMLAttributes, ReactNode } from 'react';

const buttonClasses = {
	base: 'w-full mt-2 mb-1 rounded-sm transition-all hover:scale-[1.01] hover:text-white cursor-pointer',
	variants: {
		primary:
			'bg-violet-400 hover:bg-violet-500 border border-violet-400 text-white',
		secondary: 'bg-teal-400 hover:bg-teal-500 text-white',
		'primary-outline':
			'bg-violet-200 hover:bg-violet-500 text-violet-500 border border-violet-400'
	},
	sizes: {
		default: 'px-4 py-2 text-sm font-semibold',
		small: 'px-3 py-1 text-xs font-normal'
	}
};

const Button = ({
	children,
	icon,
	variant = 'primary',
	size = 'default',
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
	icon?: ReactNode;
	variant?: 'primary' | 'secondary' | 'primary-outline';
	size?: 'default' | 'small';
}) => {
	return (
		<button
			className={`${buttonClasses.base} ${buttonClasses.variants[variant]} ${
				buttonClasses.sizes[size]
			} ${icon && 'flex items-center gap-2'}`}
			{...props}
		>
			{icon}
			{children}
		</button>
	);
};

export default Button;
