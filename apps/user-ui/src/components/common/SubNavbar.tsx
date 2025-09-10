'use client';

import { AlignJustify, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { subNavItems } from '../../constants/subNavItems';
import ProfileAvatar from './navbar/ProfileAvatar';
import WishAndCart from './navbar/WishAndCart';

const SubNavbar = () => {
	const [show, setShow] = useState(false);
	const [isSticky, setIsSticky] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 100) {
			setIsSticky(true);
		} else {
			setIsSticky(false);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<div
			className={`w-full transition-all duration-300 ${
				isSticky ? 'fixed top-0 left-0 z-[100] bg-slate-50/85' : 'relative'
			}`}
		>
			<div
				className={`w-[80%] relative m-auto flex items-center justify-between ${
					isSticky ? 'py-0' : 'py-0'
				}`}
			>
				{/* All Dropdowns */}
				<div
					className={`w-[260px] ${
						isSticky
							? 'h-[66px] bg-violet-400 text-white'
							: 'bg-slate-50/85 text-slate-400 shadow-sm shadow-slate-300 h-[50px]'
					} cursor-pointer font-semibold flex items-center justify-between px-5`}
					onClick={() => setShow(!show)}
				>
					<div className='w-full flex items-center gap-3'>
						<AlignJustify size={20} className='' />
						<span className='w-full text-base'>Categories</span>
					</div>
					{show ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
				<div className='flex items-center gap-4'>
					{subNavItems.map((item: SubNavItemsType, index: number) => (
						<Link
							key={index}
							href={item.path}
							className='px-5 font-semibold text-base text-slate-400'
						>
							{item.text}
						</Link>
					))}
				</div>

				<div className='flex items-center gap-3 py-2'>
					{isSticky && (
						<>
							<ProfileAvatar />
							<WishAndCart />
						</>
					)}
				</div>
			</div>
			{isSticky && <div className='border-b border-dotted border-slate-300' />}
		</div>
	);
};

export default SubNavbar;
