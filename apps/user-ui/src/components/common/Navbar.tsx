import Link from 'next/link';
import Logo from './Logo';
import ProfileAvatar from './navbar/ProfileAvatar';
import SearchBox from './navbar/SearchBox';
import WishAndCart from './navbar/WishAndCart';

const Navbar = () => (
	<div className='w-full bg-slate-50/85'>
		<div className='w-[80%] py-2 m-auto flex items-center justify-between'>
			<Link href={'/'}>
				<Logo />
			</Link>
			<div className='w-[50%] relative'>
				<SearchBox />
			</div>
			<div className='flex items-center gap-3'>
				<ProfileAvatar />
				<WishAndCart />
			</div>
		</div>
	</div>
);

export default Navbar;
