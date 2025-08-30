import { Search } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
	return (
		<div className='w-full bg-white'>
			<div className='w-[80%] py-5 m-auto flex items-center justify-between'>
				<div>
					<Link href={'/'}>
						<span className='text-3xl font-[500]'>Texmecom</span>
					</Link>
				</div>
				<div className='w-[50%] relative'>
					<input
						type='text'
						placeholder='Search for product...'
						className='w-full px-4 font-Poppins font-medium border-[2.5px] border-[#3489ff] outline-none h-[3.5rem]'
					/>
					<div className='w-[3.75rem] cursor-pointer flex items-center justify-center h-[3.5rem] bg-[#3489ff] absolute top-0 right-0'>
						<Search className='text-white' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
