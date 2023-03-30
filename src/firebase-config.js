// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjVgb_FFXPu4i2HPpVm3r8yA9R1XVq7EQ",
  authDomain: "cm-kuraz-production.firebaseapp.com",
  databaseURL: "https://cm-kuraz-production-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cm-kuraz-production",
  storageBucket: "cm-kuraz-production.appspot.com",
  messagingSenderId: "121521606553",
  appId: "1:121521606553:web:1b632dee2d9e9f4f1b4d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);