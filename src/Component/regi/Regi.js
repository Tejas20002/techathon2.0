// Regi.js
import React, { useState } from 'react';
import './Regi.css'; // Import your CSS file
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase';

function Regi() {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [values, setValues] = useState({
        name: "",
        email: "",
        pass: "",
    });
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleRegistration = () => {
        if (!values.name || !values.email || !values.pass) {
            setErrorMsg("Fill all The fields");
            return;
        }
        setErrorMsg("");

        createUserWithEmailAndPassword(auth, values.email, values.pass)
            .then(async (res) => {
                const user = res.user;

                // Update the user's display name
                await updateProfile(user, {
                    displayName: values.name,
                });

                // Send email verification
                await sendEmailVerification(user);

                // Show the success message
                setShowSuccessMessage(true);

                // Clear the input fields (optional)
                setValues({
                    name: "",
                    email: "",
                    pass: "",
                });
            })
            .catch((err) => {
                setSubmitButtonDisabled(false);
                setErrorMsg(err.message);
            });
    };

    return (
        <div className="registration-container">
            <div className="registration-card">
                <h2>Register</h2>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Name"
                        label="name"
                        onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
                        value={values.name}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="email"
                        placeholder="Email"
                        label="email"
                        onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
                        value={values.email}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="Password"
                        label="password"
                        onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
                        value={values.pass}
                    />
                </div>
                {showSuccessMessage ? (
                    <div className="registration-success-message">
                        Registration Successful! A verification email has been sent to your email address.
                    </div>
                ) : (
                    <>
                        <p className='style.error'>{errorMsg}</p>
                        <button
                            className="registration-button"
                            onClick={handleRegistration}
                            disabled={submitButtonDisabled}
                        >
                            Register
                        </button>
                    </>
                )}
                <p className='signupr'>Already Have an Account! <Link className='uu' to="/RegistrationForm">Signin</Link></p>
            </div>
        </div>
    );
}

export default Regi;





















// // Regi.js
// import React, { useState } from 'react';
// import './Regi.css'; // Import your CSS file
// import { Link } from 'react-router-dom';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from '../../firebase';

// function Regi() {
//     const [showSuccessMessage, setShowSuccessMessage] = useState(false);
//     const [values, setValues] = useState({
//         name: "",
//         email: "",
//         pass: "",
//     });
//     const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
//     const [errorMsg, setErrorMsg] = useState("");

//     const handleRegistration = () => {
//         if (!values.name || !values.email || !values.pass) {
//             setErrorMsg("Fill all The fields");
//             return;
//         }
//         setErrorMsg("");
//         createUserWithEmailAndPassword(auth, values.email, values.pass)
//             .then(async (res) => {
//                 setSubmitButtonDisabled(false);
//                 const user = res.user;
//                 await updateProfile(user, {
//                     displayName: values.name,
//                 });
//                 setShowSuccessMessage(true);
//                 // Clear the input fields (optional)
//                 setValues({
//                     name: "",
//                     email: "",
//                     pass: "",
//                 });
//             })
//             .catch((err) => {
//                 setSubmitButtonDisabled(false);
//                 setErrorMsg(err.message);
//             });
//     };

//     return (
//         <div className="registration-container">
//             <div className="registration-card">
//                 <h2>Register</h2>
//                 <div className="input-container">
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         label="name"
//                         onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
//                         value={values.name}
//                     />
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         label="email"
//                         onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
//                         value={values.email}
//                     />
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         label="password"
//                         onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
//                         value={values.pass}
//                     />
//                 </div>
//                 {showSuccessMessage ? (
//                     <div className="registration-success-message">
//                         Registration Successful!
//                     </div>
//                 ) : (
//                     <>
//                         <p className='style.error'>{errorMsg}</p>
//                         <button
//                             className="registration-button"
//                             onClick={handleRegistration}
//                             disabled={submitButtonDisabled}
//                         >
//                             Register
//                         </button>
//                     </>
//                 )}
//                 <p className='signupr'>Already Have an Account! <Link className='uu' to="/RegistrationForm">Signin</Link></p>
//             </div>
//         </div>
//     );
// }

// export default Regi;























// // Regi.js
// import React, { useState } from 'react';
// import './Regi.css'; // Import your CSS file
// import { Link, useNavigate } from 'react-router-dom';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { auth } from '../../firebase';

// function Regi() {
//     const navigate = useNavigate();
//     const [registrationSuccess, setRegistrationSuccess] = useState(false);
//     const [values, setValues] = useState({
//         name: "",
//         email: "",
//         pass: "",
//     });
//     const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
//     const [errorMsg, setErrorMsg] = useState("");

//     const handleRegistration = () => {
//         if (!values.name || !values.email || !values.pass) {
//             setErrorMsg("Fill all The feild");
//             return;
//         }
//         setErrorMsg("");
//         createUserWithEmailAndPassword(auth, values.email, values.pass)
//             .then(async (res) => {
//                 setSubmitButtonDisabled(false);
//                 const user = res.user;
//                 await updateProfile(user, {
//                     displayName: values.name,
//                 });
//                 navigate("/");
//             })
//             .catch((err) => {
//                 setSubmitButtonDisabled(false);
//                 setErrorMsg(err.message);
//             });
//     };


//     return (
//         <div className="registration-container">
//             <div className="registration-card">
//                 <h2>Register</h2>
//                 <div className="input-container">
//                     <input
//                         type="name"
//                         placeholder="Name"
//                         label="name"
//                         // onChange={(e) => setValues( prev=>({...prev,name:event.target.value}))}
//                         onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
//                         value={values.name}
//                     />
//                 </div>
//                 <div className="input-container">
//                     <input
//                         type="name"
//                         placeholder="Email"
//                         label="email"
//                         onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
//                         value={values.email}
//                     />
//                 </div>



//                 <div className="input-container">
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         label="password"
//                         onChange={(event) => setValues((prev) => ({ ...prev, pass: event.target.value }))}
//                         value={values.pass}
//                     />
//                 </div>

//                 {registrationSuccess ? ( // Render message if registration was successful
//                     <p className="registration-success">Registration Successful!</p>
//                 ) : (
//                     <>
//                         <div className="input-container">
//                             {/* ... Input fields ... */}
//                         </div>
//                         <p className='style.error'>{errorMsg}</p>
//                         <button className="registration-button" onClick={handleRegistration} disabled={submitButtonDisabled}>
//                             Register
//                         </button>
//                     </>
//                 )}



//                 {/* <p className='style.error'>{errorMsg}</p>
//                 <button className="registration-button" onClick={handleRegistration} disabled={submitButtonDisabled}>
//                     Register
//                 </button> */}




//                 <p className='signupr'>Already Have an Account! <Link className='uu' to="/RegistrationForm">Signin</Link></p>

//             </div>
//         </div>
//     );
// }

// export default Regi;
