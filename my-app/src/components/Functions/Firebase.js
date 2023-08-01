// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


import {getAuth,GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHYAGCUxaLA4E8DJTXxBFRaPRNeb-uPCU",
    authDomain: "cocktail-db-49928.firebaseapp.com",
    projectId: "cocktail-db-49928",
    storageBucket: "cocktail-db-49928.appspot.com",
    messagingSenderId: "285308371834",
    appId: "1:285308371834:web:cddbc952b82aeefc030cc3",
    measurementId: "G-D49M1JCPW0"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
