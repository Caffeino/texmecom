import { ShoppingCart } from 'lucide-react';
import SmileIcon from '../svg/SmileIcon';

const Logo = () => {
	return (
		<div className='flex flex-row items-center gap-1 leading-none'>
			<div className='flex items-center flex-row z-10'>
				<p className='lg:text-2xl md:text-2xl sm:text-[1.45rem] font-normal text-teal-400'>
					Texme
				</p>
				<p className='lg:text-2xl md:text-2xl sm:text-[1.45rem] font-semibold text-violet-400'>
					Shop
				</p>
			</div>
			<div className='w-full flex items-center'>
				<ShoppingCart className='h-12 w-12 rotate-[-28deg] text-violet-400 absolute' />
				<SmileIcon
					fill='#2dd4bf'
					className='h-5 w-5 rotate-[-28deg] text-teal-400 absolute ml-4 -mt-1'
				/>
			</div>
		</div>
	);
};

export default Logo;
