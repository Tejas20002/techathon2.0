
import React, { useState } from 'react';
import './Apoint.css';

const AppointmentForm = ({ db }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [email, setEmail] = useState('');

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleStartChange = (e) => setStart(e.target.value);
    const handleEndChange = (e) => setEnd(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleAddAppointment = () => {
        // db.collection('events').add({
        //   title,
        //   start: new Date(start),
        //   end: new Date(end),
        // });

        // Clear form fields
        setTitle('');
        setStart('');
        setEnd('');
        setEmail('');
    };

    return (
        <div className='nmn'>
            <h2>Add Appointment</h2>
            <label>Eamil:</label>
            <input type="text" value={email} onChange={handleEmailChange} />
            <br />
            <label>Title:</label>
            <input type="text" value={title} onChange={handleTitleChange} />
            <br />
            <label>Start:</label>
            <input type="datetime-local" value={start} onChange={handleStartChange} />
            <br />
            <label>End:</label>
            <input type="datetime-local" value={end} onChange={handleEndChange} />
            <br />
            <button onClick={handleAddAppointment}>Add Appointment</button>
        </div>
    );
};

export default AppointmentForm;
