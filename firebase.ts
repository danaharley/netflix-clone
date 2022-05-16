// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgas5hQJvX2zQaJ5jwVOTIGmG4MDjV6rk",
  authDomain: "netflix-clone-nubicoder.firebaseapp.com",
  projectId: "netflix-clone-nubicoder",
  storageBucket: "netflix-clone-nubicoder.appspot.com",
  messagingSenderId: "629622785257",
  appId: "1:629622785257:web:3a8a7c5784a79588459c78",
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
