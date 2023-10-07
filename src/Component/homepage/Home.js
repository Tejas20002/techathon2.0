import React from 'react';
import './Home.css'

const Home = () => {
    return (
        <div className='homemain' >
            <h3>Key Features</h3>
            <div className='homediv'>
                <div className='abc'>
                    <h4>Custom Scheduling Links</h4>
                    <p> Users can create personalized scheduling links (e.g., abc.com/meeting/withme) for easy sharing and booking of meetings.</p>
                </div>
                <div className='abc'>
                    <h4>Calendar Integration</h4>
                    <p>   The platform seamlessly integrates with Google and Microsoft calendars, providing a unified view of events from both calendars.</p>
                </div>
                <div className='abc'><h4>Availability Management</h4>
                    <p>  Users can define their availability for the next three months, allowing them to specify when they are open for meetings.</p></div>
                <div className='abc'><h4>Meeting Booking</h4>
                    <p> Other users can easily browse a person's availability and book time slots for meetings, specifying the duration of the meeting.</p></div>
            </div>

        </div>
    );
};

export default Home;