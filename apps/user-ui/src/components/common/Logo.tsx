import LogoIcon from '../svg/LogoIcon';

const Logo = () => (
	<div className='flex flex-row items-center gap-1 leading-none px-5'>
		<div className='flex items-center flex-row z-10'>
			<p className='lg:text-2xl md:text-2xl sm:text-[1.45rem] font-normal text-teal-400'>
				Texme
			</p>
			<p className='lg:text-2xl md:text-2xl sm:text-[1.45rem] font-semibold text-violet-400'>
				Com
			</p>
		</div>
		<LogoIcon />
	</div>
);

export default Logo;
