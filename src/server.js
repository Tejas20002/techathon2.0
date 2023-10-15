const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const app = express();
const port = 3001;

const YOUR_CLIENT_ID = 'YOUR_CLIENT_ID';
const YOUR_CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const YOUR_REDIRECT_URI = 'http://localhost:3001/auth/callback'; // Must match the redirect URI in your Google Cloud Console

const oAuth2Client = new OAuth2Client(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URI
);

const tokensStorage = {}; // In-memory storage for tokens (replace with a database in production)

app.get('/auth', (req, res) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar.events'],
  });
  res.redirect(authUrl);
});

app.get('/auth/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;

    // Store tokens securely (e.g., in a database)
    tokensStorage['user123'] = { accessToken, refreshToken };

    res.send('Tokens exchanged successfully!');
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    res.status(500).send('Error exchanging code for token');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
