// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGT_Y6qLRu5gbiB8NaK4J7L7KN6K3J4rM",
  authDomain: "ema-john-firebase-auth-98bf9.firebaseapp.com",
  projectId: "ema-john-firebase-auth-98bf9",
  storageBucket: "ema-john-firebase-auth-98bf9.appspot.com",
  messagingSenderId: "795088213287",
  appId: "1:795088213287:web:ac0fe99ba59ed9ec5dc502"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;