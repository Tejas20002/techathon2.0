import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import logo from './logo.png'; // Import the image

const Navbar = () => {
    return (
        <div className="link">
            {/* Use the imported image in the <img> element */}
            <img src={logo} alt="Logo" />
            <div className='linkComent'>
                <Link className='linktwo' to="/">Dashboard</Link>
                <Link className='linktwo' to="/RegistrationForm">Get Started</Link>
            </div>

        </div>
    );
};

export default Navbar;
