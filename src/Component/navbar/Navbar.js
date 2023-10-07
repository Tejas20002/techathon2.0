import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
    return (
        <div className="link">
            <Link className='linktwo' to="/ " >Dashbord</Link>
            <Link className='linktwo' to="/RegistrationForm"> Get Start</Link>

        </div>
    );
};

export default Navbar;