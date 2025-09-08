import { HeartIcon, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Logo from '../svgs/Logo';
import ProfileIcon from '../svgs/ProfileIcon';

const Header = () => {
	return (
		<div className='w-full bg-violet-950 border-b border-dotted border-slate-300'>
			<div className='w-[80%] py-2 m-auto flex items-center justify-between'>
				<Link href={'/'}>
					<Logo />
				</Link>
				<div className='w-[50%] relative'>
					<input
						type='text'
						placeholder='Search for product...'
						className='w-full px-4 font-Poppins font-light border-[1.5px] text-violet-950 placeholder-orange-400 border-orange-300 outline-none h-[3rem] rounded-md'
					/>
					<div className='w-[3.75rem] cursor-pointer flex items-center border border-orange-300 justify-center h-[3rem] bg-orange-400 rounded-sm absolute top-0 right-0'>
						<Search className='text-white' />
					</div>
				</div>
				<div className='flex items-center gap-6'>
					<div className='flex items-center gap-3'>
						<Link
							href={'/login'}
							className='border border-orange-500 bg-orange-400 w-[50px] h-[50px] flex items-center justify-center rounded-full'
						>
							<ProfileIcon className='text-white' />
						</Link>
						<Link href={'/login'} className=''>
							<span className='block font-normal text-white'>Hello,</span>
							<span className='font-semibold text-white'>Sign In</span>
						</Link>
					</div>
					<Link href={'/wishlist'} className='relative'>
						<HeartIcon size={26} className='text-orange-400' />
						<div className='w-[1.25rem] h-[1.25rem] border-2 border-white bg-orange-500 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
							<span className='text-white font-medium text-xs'>0</span>
						</div>
					</Link>
					<Link href={'/cart'} className='relative'>
						<ShoppingCart size={26} className='text-orange-400' />
						<div className='w-[1.25rem] h-[1.25rem] border-2 border-white bg-orange-500 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
							<span className='text-white font-medium text-xs'>4</span>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;
