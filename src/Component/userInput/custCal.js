
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'; // Missing import
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import AppointmentForm from './AppointmentForm';
import { useParams } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const firebaseConfig = {
    apiKey: "AIzaSyClJdNxXd7ew4We20TyftPJ9kq83mU8vcs",
    authDomain: "techathon2-f6fc5.firebaseapp.com",
    projectId: "techathon2-f6fc5",
    storageBucket: "techathon2-f6fc5.appspot.com",
    messagingSenderId: "762223999493",
    appId: "1:762223999493:web:b3e6efdeb0cd7c1abbba6c",
    measurementId: "G-3D6ZPY5LEK"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const YOUR_CLIENT_ID = '762223999493-33ebbolgqdqdf6kebcco75l8jgt9j5cl.apps.googleusercontent.com';
const YOUR_CLIENT_SECRET = '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';
const YOUR_REDIRECT_URI = 'https://techathon-2-0-personal-meeting-scheduling.vercel.app/auth/callback';

const CustCal = () => {
    const name = useParams();
    console.log(name.name);
    const [events, setEvents] = useState([]);
    const accessToken = "ya29.a0AfB_byDyQwdzpNH57GvxBGvBom-nISaes15RuXJhUuCZqdhDvTvHQRbnXo5AenPevENC0yOkUHVzZ-7mMhaeMvno1ODf2_RuAab_ubtsiHxRT8sDloYqWvH8tkIe8XSSMYcvElsYTvqQsDXaru_EknM2ndC-4S_7UzkaCgYKAVYSARMSFQGOcNnCkzSr1GVrKQmH5ogzo0rqGg0170";
    // const [accessToken, setAccessToken] = useState(accessTokens);
    const [googleMeetEvents, setGoogleMeetEvents] = useState([]);
    const [loadingGoogleMeet, setLoadingGoogleMeet] = useState(false);

    useEffect(() => {
        const unsubscribe = db.collection('events').onSnapshot(
            (snapshot) => {
                const newEvents = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    start: doc.data().start.toDate(),
                    end: doc.data().end.toDate(),
                }));
                console.log("New Events===>", newEvents);
                setEvents(newEvents);
            },
            (error) => {
                console.error('Error fetching data from Firestore:', error);
            }
        );

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        // (setAccessToken(localStorage.getItem("accesstoken")))
    }, [])

    const handleSignIn = () => {
        const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/calendar.events&access_type=offline`;
        window.location.href = authUrl;
    };

    const handleSignOut = () => {
        // setAccessToken('');
        setEvents([]);
    };

    const handleTokenExchange = async (code) => {
        try {
            const response = await axios.post(
                'https://oauth2.googleapis.com/token',
                null,
                {
                    params: {
                        code,
                        client_id: YOUR_CLIENT_ID,
                        client_secret: YOUR_CLIENT_SECRET,
                        redirect_uri: YOUR_REDIRECT_URI,
                        grant_type: 'authorization_code',
                    },
                }
            );
            // setAccessToken(response.data.access_token);
            localStorage.setItem("accesstoken", response.data.access_token)

            console.log('Access Token:', response.data.access_token);

            fetchGoogleCalendarEvents(response.data.access_token);
        } catch (error) {
            console.error('Error exchanging code for token:', error);
        }
    };

    const fetchGoogleCalendarEvents = async (accessToken) => {
        try {
            const response = await axios.get(
                `https://www.googleapis.com/calendar/v3/calendars/${name.name}/events?key=AIzaSyCMji7wJdIUdUHkcAmbOSlp1rdztffuD20`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            var demo = response.data.items.map((event) => {
                var enDate = new Date(event.end.dateTime);
                var stDate = new Date(event.start.dateTime);
                return {
                    title: event.summary,
                    start: stDate.toUTCString(),
                    end: enDate.toUTCString()
                }
            })
            setEvents(demo)

            console.log("MyData==>", demo)
            console.log('Google Calendar Events:', response.data.items);
            setGoogleMeetEvents(response.data.items[5]);
        } catch (error) {
            console.error('Error fetching events from Google Calendar:', error);
        }
    };

    const fetchGoogleMeetEvents = async (accessToken) => {
        try {
            setLoadingGoogleMeet(true);
            const response = await axios.get(
                `https://www.googleapis.com/calendar/v3/calendars/${name.name}/events?key=AIzaSyCMji7wJdIUdUHkcAmbOSlp1rdztffuD20`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log('Google Meet Events:', response.data.items);
        } catch (error) {
            console.error('Error fetching Google Meet events:', error);
        } finally {
            setLoadingGoogleMeet(false);
        }
    };

    const handleSelect = async ({ start, end }) => {
        const title = window.prompt('Enter Event Title:');
        if (title) {
            const googleEvent = {
                summary: title,
                start: { dateTime: start.toISOString() },
                end: { dateTime: end.toISOString() },
            };

            await axios.post(
                `https://www.googleapis.com/calendar/v3/calendars/${name.name}/events?key=AIzaSyCMji7wJdIUdUHkcAmbOSlp1rdztffuD20`,
                googleEvent,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            await db.collection('events').add({
                title,
                start: new Date(start),
                end: new Date(end),
            });

            fetchGoogleCalendarEvents(accessToken);
        }
    };

    const handleRefresh = () => {
        fetchGoogleCalendarEvents(accessToken);
    }


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            handleTokenExchange(code);
        }
    }, []);

    return (
        <div className='datafetch'>
            <h1>Set Your Scheduler</h1>
            {accessToken ? (
                <button onClick={handleSignOut}>Sign Out</button>
            ) : (
                <button onClick={handleSignIn}>Sign In with Google</button>
            )}
            {/* <AppointmentForm /> */}
            <button onClick={handleRefresh}>refresh</button>
            {/* {loadingGoogleMeet ? (
        <p>Loading Google Meet events...</p>
      ) : (
        <textarea
          rows="10"
          cols="50"
          value={JSON.stringify(googleMeetEvents, null, 2)}
          readOnly
        />
      )} */}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelect}
            />
        </div>
    );
};

export default CustCal;
