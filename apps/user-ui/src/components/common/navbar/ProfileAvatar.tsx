import ProfileIcon from '../../svg/ProfileIcon';

const ProfileAvatar = ({ openLoginModal }: { openLoginModal: () => void }) => (
	<div className='py-1 px-2 hover:bg-slate-200/65 rounded-md'>
		<button
			type='button'
			className='flex flex-row gap-1'
			onClick={openLoginModal}
		>
			<div className='border border-slate-200/75 bg-slate-100/75 w-[40px] h-[40px] flex items-center justify-center rounded-full'>
				<ProfileIcon className='text-slate-400' />
			</div>
			<div className='flex flex-col gap-1 items-start'>
				<span className='text-xs font-normal text-slate-400'>Hola,</span>
				<span className='text-xs font-semibold text-violet-400'>
					Inicia sesi&oacute;n
				</span>
			</div>
		</button>
	</div>
);

export default ProfileAvatar;
