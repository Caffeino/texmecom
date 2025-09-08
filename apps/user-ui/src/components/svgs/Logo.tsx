import Handbag from './Handbag';

const Logo = () => {
	return (
		<div className='flex flex-row items-center leading-none'>
			<Handbag className='h-12 w-12 rotate-[20deg] text-orange-400 absolute -mt-2' />
			<div className='flex items-center gap-0 flex-row z-10 mt-2'>
				<p className='lg:text-[1.5rem] md:text-[1.45rem] sm:text-[1.45rem] font-Libertinus font-bold text-white ml-2 -mt-1'>
					T
				</p>
				<p className='lg:text-[1.5rem] md:text-[1.45rem] sm:text-[1.45rem] font-semibold text-white -mt-1 [text-shadow:2px_0px_2px_rgba(242,109,0,0.5)]'>
					exmeshop
				</p>
			</div>
		</div>
	);
};

export default Logo;
