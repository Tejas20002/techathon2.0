// Regi.js
import React, { useState } from 'react';
import './Regi.css'; // Import your CSS file
import { Link } from 'react-router-dom';

function Regi() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleRegistration = () => {
        // Add your registration logic here (e.g., API request to create a new account)
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2>Register</h2>
                <div className="input-container">
                    <input
                        type="name"
                        placeholder="FirstName"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="name"
                        placeholder="LastName"
                        value={email}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="registration-button" onClick={{ handleRegistration }}>
                    Register
                </button>
                <p className='signupr'>Already Have an Account! <Link className='uu' to="/RegistrationForm">Signin</Link></p>

            </div>
        </div>
    );
}

export default Regi;
