import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAGywCowCfEvRe0VrXRALvuO6RfYdQSSpY",
  authDomain: "react-chat-app-8d61f.firebaseapp.com",
  databaseURL: "https://react-chat-app-8d61f-default-rtdb.firebaseio.com",
  projectId: "react-chat-app-8d61f",
  storageBucket: "react-chat-app-8d61f.appspot.com",
  messagingSenderId: "1017893505304",
  appId: "1:1017893505304:web:a8fe1ff2618e57f3d3b66d",
  measurementId: "G-NP9ETG6VBD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
