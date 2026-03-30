import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnQNZufnN73a1uyapsFq7lDk8l_rgmNjg",
  authDomain: "lastproject-93e52.firebaseapp.com",
  projectId: "lastproject-93e52",
  storageBucket: "lastproject-93e52.firebasestorage.app",
  messagingSenderId: "14680312600",
  appId: "1:14680312600:web:084e9803453aba6c266c6d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
