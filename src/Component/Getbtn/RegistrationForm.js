import React, { useState } from 'react';
import './RegistrationForm.css'
import Regi from '../regi/Regi';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom';




function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailSignIn = () => {
        // Implement email and password authentication here
    };

    const handleGoogleSignIn = () => {
        // Implement Google authentication here
    };

    const handlePhoneSignIn = () => {
        // Implement phone authentication here
    };

    return (
        <div className='signin'>
            <h1>Sign In</h1>
            <form className='formname'>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />  </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    /></div>

            </form>

            <div className='orc'>
                <h4>Or</h4>
                <h4>Continue With</h4>
            </div>

            <div className='googlesign'>
                <div><button onClick={handleGoogleSignIn}>Google</button></div>
                <div><button onClick={handlePhoneSignIn}>  Phone</button></div>

            </div>
            <button className='submitbtn'>Submit</button>
            
            
            <p className='signupr'>Don't have an account? <Link className='uu' to="/Regi">Sign Up</Link></p>



        </div>
    );
}

export default RegistrationForm;
