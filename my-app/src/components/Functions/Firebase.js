
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID ,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
  };


// Initialize Firebase only if credentials are provided
let app, db, auth, provider;

try {
  if (process.env.REACT_APP_API_KEY && process.env.REACT_APP_API_KEY !== 'your-api-key-here') {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    provider = new GoogleAuthProvider();
  } else {
    console.warn('Firebase credentials not configured. Authentication and favorites features will be disabled.');
    // Create mock objects to prevent errors
    db = null;
    auth = null;
    provider = null;
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
  db = null;
  auth = null;
  provider = null;
}

export { db, auth, provider }
