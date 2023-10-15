import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios'; // Missing import
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import AppointmentForm from './AppointmentForm';
import { UserAgentApplication } from 'msal';


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
const YOUR_REDIRECT_URI = 'https://8f5d-43-241-145-254.ngrok-free.app/auth/callback';
const YOUR_OUTLOOK_CLIENT_ID = 'c53c6ea7-f896-4f98-92d8-e0886e5f552e';
const YOUR_OUTLOOK_REDIRECT_URI = 'https://8f5d-43-241-145-254.ngrok-free.app/redirect'; // Ensure this matches your registered redirect URI for Outlook

const msalConfig = {
  auth: {
    clientId: YOUR_OUTLOOK_CLIENT_ID,
    redirectUri: YOUR_OUTLOOK_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};
const msalInstance = new UserAgentApplication(msalConfig);
let outlookData;

const App = () => {
  const [events, setEvents] = useState([]);
  const [accessToken, setAccessToken] = useState('');
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
    msalInstance.handleRedirectCallback(() => {
      if (msalInstance.getAccount()) {
        // User is logged in, make API requests here
        fetchCalendarEvents();
      }
    });
  }, []);

  const login = async () => {
    var loginResponse = await msalInstance.loginRedirect({
      scopes: ['Calendars.ReadWrite offline_access'],
    });
    console.log(loginResponse)
  };

  const fetchCalendarEvents = async () => {
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ['Calendars.ReadWrite offline_access User.Read'],
      });

      const response = await fetch('https://graph.microsoft.com/v1.0/me/events', {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      });

      const data = await response.json();
      console.log(data.value)
      outlookData = data.value;
      var demo1 = data.value.map((event) => {
        var enDate = new Date(event.end.dateTime);
        var stDate = new Date(event.start.dateTime);
        return {
          title: event.subject,
          start: stDate.toUTCString(),
          end: enDate.toUTCString()
        }
      });
      console.log("Outlook data:- ", demo1);
      setEvents(demo1);
    } catch (error) {
      console.error('Error fetching calendar events:', error);
    }
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accesstoken"));
  }, [])

  const handleSignIn = () => {
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${YOUR_CLIENT_ID}&redirect_uri=${YOUR_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/calendar.events&access_type=offline`;
    window.location.href = authUrl;
  };

  const handleSignOut = () => {
    setAccessToken('');
    setEvents([]);
  };

  const handleTokenExchange = async (code) => {
    var Gcode = code || localStorage.getItem('Gcode');
    try {
      const response = await axios.post(
        'https://oauth2.googleapis.com/token',
        null,
        {
          params: {
            Gcode,
            client_id: YOUR_CLIENT_ID,
            client_secret: YOUR_CLIENT_SECRET,
            redirect_uri: YOUR_REDIRECT_URI,
            grant_type: 'authorization_code',
          },
        }
      );
      setAccessToken(response.data.access_token);
      localStorage.setItem("accesstoken", response.data.access_token)

      console.log('Access Token:', response.data.access_token);

      fetchGoogleCalendarEvents(response.data.access_token || localStorage.getItem('accesstoken'));
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  const fetchGoogleCalendarEvents = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/thirani969@rku.ac.in/events?key=AIzaSyCMji7wJdIUdUHkcAmbOSlp1rdztffuD20`,
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
      });

      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ['Calendars.ReadWrite offline_access User.Read'],
      });

      const responseOutlook = await fetch('https://graph.microsoft.com/v1.0/me/events', {
        headers: {
          Authorization: `Bearer ${tokenResponse.accessToken}`,
        },
      });
      const data = await responseOutlook.json();
      var demo1 = data.value.map((event) => {
        var enDate = new Date(event.end.dateTime);
        var stDate = new Date(event.start.dateTime);
        return {
          title: event.subject,
          start: stDate.toUTCString(),
          end: enDate.toUTCString()
        }
      })
      const newData = demo.concat(demo1)
      setEvents(newData)
      
      console.log("MyData==>", demo)
      console.log('Google Calendar Events:', response.data.items);
      setGoogleMeetEvents(response.data.items[5]);
    } catch (error) {
      console.error('Error fetching events from Google Calendar:', error);
      fetchCalendarEvents();
    }
  };

  const fetchGoogleMeetEvents = async (accessToken) => {
    try {
      setLoadingGoogleMeet(true);
      const response = await axios.get(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
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
        `https://www.googleapis.com/calendar/v3/calendars/thirani969@rku.ac.in/events?key=AIzaSyCMji7wJdIUdUHkcAmbOSlp1rdztffuD20`,
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

    // outlook event add
    const eventPayload = {
      subject: title,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Specify your time zone
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Specify your time zone
      },
    };
  
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        scopes: ['Calendars.ReadWrite offline_access User.Read'],
      });
      const response = await fetch('https://graph.microsoft.com/v1.0/me/calendar/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenResponse.accessToken}`,
        },
        body: JSON.stringify(eventPayload),
      });
  
      if (response.ok) {
        console.log('Outlook Event Created Successfully');
      } else {
        console.error('Failed to create event in Outlook Calendar:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating event in Outlook Calendar:', error);
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
      localStorage.setItem('googlecode', code)
    }else{
      handleTokenExchange(localStorage.getItem('googlecode'));
    }
  }, []);

  return (
    <div>
      <h1>React Scheduler</h1>
      {accessToken ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <button onClick={handleSignIn}>Sign In with Google</button>
        </>
      )}
      <h3>Outlook Calendar</h3>
      { !localStorage.getItem('msal.c53c6ea7-f896-4f98-92d8-e0886e5f552e.client.info') ?
      ( <button onClick={login}>Login with Outlook</button> ) :
      ( <button>Sign Out</button> )
      }
        
      <AppointmentForm />
      <button onClick={handleRefresh}>Refresh Google</button>
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

export default App;