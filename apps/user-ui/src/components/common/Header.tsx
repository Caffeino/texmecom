import Navbar from './Navbar';
import SubNavbar from './SubNavbar';

const Header = () => (
	<>
		<Navbar />
		<div className='border-b border-dotted border-slate-300' />
		<SubNavbar />
	</>
);

export default Header;
