// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from  "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnQNZufnN73a1uyapsFq7lDk8l_rgmNjg",
  authDomain: "lastproject-93e52.firebaseapp.com",
  projectId: "lastproject-93e52",
  storageBucket: "lastproject-93e52.firebasestorage.app",
  messagingSenderId: "14680312600",
  appId: "1:14680312600:web:084e9803453aba6c266c6d",
  measurementId: "G-3RP64D37QN"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
