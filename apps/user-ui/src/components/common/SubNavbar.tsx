'use client';

import { AlignJustify, ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const SubNavbar = () => {
	const [show, setShow] = useState(false);
	const [isSticky, setIsSticky] = useState(false);

	const handleScroll = () => setIsSticky(window.screenY > 100);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			className={`w-fill transition-all duration-300 ${
				isSticky ? 'fixed top-0 left-0 z-[100] bg-white shadow-lg' : 'relative'
			}`}
		>
			<div
				className={`w-[80%] relative m-auto flex items-center justify-between ${
					isSticky ? 'pt-3' : 'py-0'
				}`}
			>
				{/* All Dropdowns */}
				<div
					className={`w-[260px] ${
						isSticky && '-mb-2'
					} cursor-pointer flex items-center justify-between px-5 h-[50px] bg-slate-50/85 shadow-sm shadow-slate-300`}
					onClick={() => setShow(!show)}
				>
					<div className='w-full flex items-center gap-3'>
						<AlignJustify size={20} className='text-slate-400' />
						<span className='w-full text-slate-500 font-normal text-sm'>
							Categories
						</span>
					</div>
					{show ? (
						<ChevronUp size={20} className='text-slate-400' />
					) : (
						<ChevronDown size={20} className='text-slate-400' />
					)}
				</div>

				{/* Dropdown menu */}
				{show && (
					<div
						className={`w-[260px] h-[400px] bg-slate-50/85 shadow-sm shadow-slate-300 absolute left-0 ${
							isSticky ? 'top-[70px]' : 'top-[50px]'
						}`}
					></div>
				)}

				{/* Navigation Links */}
				<div></div>
			</div>
		</div>
	);
};

export default SubNavbar;
