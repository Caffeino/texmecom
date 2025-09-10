import Link from 'next/link';
import ProfileIcon from '../../svg/ProfileIcon';

const ProfileAvatar = () => (
	<div className='flex items-center gap-2'>
		<Link
			href={'/login'}
			className='border border-teal-200/50 bg-teal-50 w-[50px] h-[50px] flex items-center justify-center rounded-full'
		>
			<ProfileIcon className='text-teal-400' />
		</Link>
		<Link href={'/login'} className=''>
			<span className='block text-sm font-light text-teal-400'>Hello,</span>
			<span className='font-normal text-violet-400'>Sign In</span>
		</Link>
	</div>
);

export default ProfileAvatar;
