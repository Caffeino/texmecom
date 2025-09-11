'use client';

import { useState } from 'react';
import Login from '../form/auth/Login';
import Modal from '../modal/Modal';
import Navbar from './Navbar';
import SubNavbar from './SubNavbar';

const Header = () => {
	const [showModal, setShowModal] = useState(false);

	const openLoginModal = () => setShowModal(true);
	const closeLoginModal = () => setShowModal(false);

	return (
		<>
			<Navbar openLoginModal={openLoginModal} />
			<div className='border-b border-dotted border-slate-300' />
			<SubNavbar />
			<Modal open={showModal} onClose={closeLoginModal} hideHeader>
				<Login />
			</Modal>
		</>
	);
};

export default Header;
