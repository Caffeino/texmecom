import { HeartIcon, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const WishAndCart = () => (
	<div className='flex items-center gap-1 px-2'>
		<Link
			href={'/wishlist'}
			className='p-[.85rem] rounded-full hover:bg-slate-200/65'
		>
			<div className='relative'>
				<HeartIcon size={22} className='text-teal-400' />
				<div className='w-[1.25rem] h-[1.25rem] border-2 border-white bg-red-400 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
					<span className='text-white font-medium text-xs -tracking-wider'>
						0
					</span>
				</div>
			</div>
		</Link>
		<Link
			href={'/cart'}
			className='p-[.85rem] rounded-full hover:bg-slate-200/65'
		>
			<div className='relative'>
				<ShoppingCart size={22} className='text-violet-400' />
				<div className='w-[1.25rem] h-[1.25rem] border-2 border-white bg-red-400 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
					<span className='text-white font-medium text-xs -tracking-wider'>
						0
					</span>
				</div>
			</div>
		</Link>
	</div>
);

export default WishAndCart;
