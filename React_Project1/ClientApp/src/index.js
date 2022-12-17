import 'bootstrap/dist/css/bootstrap.css'; // Make the web page to have a modern look
import React from 'react';  //all is about React, so must import it
import ReactDOM from 'react-dom';  // React has virtual DOM and real DOM, so must import real DOM here.
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(  // Insert the first argu below to the place of index.html defined by the second argu
  <BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

