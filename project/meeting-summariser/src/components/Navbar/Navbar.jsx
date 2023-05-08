import './Navbar.css';
import { CgProfile } from 'react-icons/cg'

const Navbar = ({ title }) => {
	return (
        <>
        <nav className='navbar'>
            <div className='navbar-title'>
                {title}
            </div>

            <div className='side'>
            <CgProfile className='profile' />
                <img className='logo' src="/minute_mind_logo.PNG" alt="" />
            </div>
        </nav>
        </>
	);
};

export default Navbar;
