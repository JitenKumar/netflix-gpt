// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdmRx9EQ7rLh4X3Q6c7dS88OnD1f6PyJs",
  authDomain: "netflix-gpt-8156a.firebaseapp.com",
  projectId: "netflix-gpt-8156a",
  storageBucket: "netflix-gpt-8156a.appspot.com",
  messagingSenderId: "722702266456",
  appId: "1:722702266456:web:1966a9a72f4f4b82ab9a2d",
  measurementId: "G-P8ZR7CRWJF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
