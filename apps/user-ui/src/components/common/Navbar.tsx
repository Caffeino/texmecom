import Link from 'next/link';
import Logo from './Logo';
import ProfileAvatar from './navbar/ProfileAvatar';
import SearchBox from './navbar/SearchBox';
import WishAndCart from './navbar/WishAndCart';

const Navbar = ({ openLoginModal }: { openLoginModal: () => void }) => (
	<div className='w-full bg-slate-50'>
		<div className='w-[80%] py-2 m-auto flex items-center justify-between'>
			<Link href={'/'}>
				<Logo />
			</Link>
			<div className='w-[50%] relative'>
				<SearchBox />
			</div>
			<div className='flex items-center gap-0'>
				<ProfileAvatar openLoginModal={openLoginModal} />
				<WishAndCart />
			</div>
		</div>
	</div>
);

export default Navbar;
