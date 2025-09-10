import { HeartIcon, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import ProfileIcon from '../svg/ProfileIcon';
import Logo from './Logo';
import SubNavbar from './SubNavbar';

const Navbar = () => {
	return (
		<>
			<div className='w-full bg-slate-50/85 border-b border-dotted border-slate-300'>
				<div className='w-[80%] py-2 m-auto flex items-center justify-between'>
					<Link href={'/'}>
						<Logo />
					</Link>
					<div className='w-[50%] relative'>
						<input
							type='text'
							placeholder='Search for product...'
							className='w-full px-4 font-Poppins font-light border-[1.5px] text-violet-950 outline-none h-[2.75rem] rounded-md'
						/>
						<div className='w-[3.75rem] cursor-pointer flex items-center border border-violet-300 justify-center h-[2.75rem] bg-violet-300 rounded-sm absolute top-0 right-0'>
							<Search className='text-white' />
						</div>
					</div>
					<div className='flex items-center gap-6'>
						<div className='flex items-center gap-3'>
							<Link
								href={'/login'}
								className='border border-teal-200/50 bg-teal-50 w-[50px] h-[50px] flex items-center justify-center rounded-full'
							>
								<ProfileIcon className='text-teal-400' />
							</Link>
							<Link href={'/login'} className=''>
								<span className='block text-sm font-light text-teal-400'>
									Hello,
								</span>
								<span className='font-normal text-violet-400'>Sign In</span>
							</Link>
						</div>
						<Link href={'/wishlist'} className='relative'>
							<HeartIcon size={22} className='text-teal-400' />
							<div className='w-[1.25rem] h-[1.25rem] border-2 border-white bg-red-400 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
								<span className='text-white font-medium text-xs'>0</span>
							</div>
						</Link>
						<Link href={'/cart'} className='relative'>
							<ShoppingCart size={22} className='text-violet-400' />
							<div className='w-[1.25rem] h-[1.25rem] border-2 border-white bg-red-400 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
								<span className='text-white font-medium text-xs'>0</span>
							</div>
						</Link>
					</div>
				</div>
			</div>
			<SubNavbar />
		</>
	);
};

export default Navbar;
