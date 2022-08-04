import firebase from "firebase/compat/app";

/* 
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}; */
const firebaseConfig = {
    apiKey: "AIzaSyD2aB0Qx2FCCZjw1UFTVZyjbAHN_d4ZID0",
    authDomain: "authstore-b3aa1.firebaseapp.com",
    projectId: "authstore-b3aa1",
    storageBucket: "authstore-b3aa1.appspot.com",
    messagingSenderId: "974474403576",
    appId: "1:974474403576:web:9ca77f0adaeb130522250d",
    measurementId: "G-BFR3P9Q4J0"
  };
  

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase