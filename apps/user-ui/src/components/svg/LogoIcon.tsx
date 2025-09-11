import { ShoppingCart } from 'lucide-react';
import SmileIcon from './SmileIcon';

const variants = {
	cart: {
		sm: 'h-11 w-11',
		md: '',
		lg: 'h-12 w-12'
	},
	smile: {
		sm: 'h-4 w-4',
		md: '',
		lg: 'h-5 w-5'
	}
};

const LogoIcon = ({ variant = 'lg' }: { variant?: 'sm' | 'md' | 'lg' }) => (
	<div className='w-full flex items-center'>
		<ShoppingCart
			className={`${
				variants.cart[variant] ?? ''
			} rotate-[-28deg] text-violet-400 absolute`}
		/>
		<SmileIcon
			fill='#2dd4bf'
			className={`${
				variants.smile[variant] ?? ''
			} rotate-[-28deg] text-teal-400 relative ml-4 -mt-1`}
		/>
	</div>
);

export default LogoIcon;
