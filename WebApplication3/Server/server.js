const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000; // Choose a port number

app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const sendGridApiKey = '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';
  const sendGridApiUrl = 'https://api.sendgrid.com/v3/mail/send';

  const headers = {
    'Authorization': `Bearer ${sendGridApiKey}`,
    'Content-Type': 'application/json',
  };

  const emailData = {
    personalizations: [
      {
        to: [{ email: 'bingduus@hotmail.com' }],
        subject: 'Your Subject Here',
      },
    ],
    content: [
      {
        type: 'text/plain',
        value: 'Your email content here.',
      },
    ],
    from: { email: 'bingduus2023@gmail.com' },
  };

  try {
    const response = await axios.post(sendGridApiUrl, emailData, { headers });
    console.log('Email sent successfully:', response.data);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.data : error.message);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
