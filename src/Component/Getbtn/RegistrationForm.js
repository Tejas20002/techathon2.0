import React, { useState } from 'react';
import './RegistrationForm.css'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { signInWithEmailAndPassword } from "firebase/auth";


import { auth } from "../../firebase";

import styles from "./RegistrationForm.css";

function RegistrationForm() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        pass: "",
    });
    const [errorMsg, setErrorMsg] = useState("");
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

    const handleSubmission = () => {
        if (!values.email || !values.pass) {
            setErrorMsg("Fill all fields");
            return;
        }
        setErrorMsg("");

        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                setSubmitButtonDisabled(false);

                navigate("/");
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    return (
        <div className='signin'>
            <h1>Sign In</h1>
            <form className='formname'>
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        label="Email"
                        onChange={(event) =>
                            setValues((prev) => ({ ...prev, email: event.target.value }))
                        }

                    />  </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        label="pass"
                        onChange={(event) =>
                            setValues((prev) => ({ ...prev, pass: event.target.value }))
                        }
                    /></div>

            </form>


            <b className={styles.error}>{errorMsg}</b>
            <button className='submitbtn' disabled={submitButtonDisabled} onClick={handleSubmission}> Signin </button>
            <div className='orc'>
                <h4>Or</h4>
                <h4>Continue With</h4>
            </div>
            <div className='googlesign'>
                <div><button  > Google</button></div>
                <div><button  > <FontAwesomeIcon icon={faPhone} /> Phone</button></div>

            </div>

            <p className='signupr'>Don't have an account? <Link className='uu' to="/Regi">Sign Up</Link></p>



        </div>
    );
}

export default RegistrationForm;
