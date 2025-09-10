import { Search } from 'lucide-react';

const SearchBox = () => (
	<>
		<input
			type='text'
			placeholder='Search for product...'
			className='w-full px-4 font-Poppins font-light border-[1.5px] text-violet-950 outline-none h-[2.75rem] rounded-md'
		/>
		<div className='w-[3.75rem] cursor-pointer flex items-center border border-violet-300 justify-center h-[2.75rem] bg-violet-300 rounded-sm absolute top-0 right-0'>
			<Search className='text-white' />
		</div>
	</>
);

export default SearchBox;
