// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLAf6BMveroq60BJeKzrPuFdFaXJzDmTI",
  authDomain: "ashok-enterprises.firebaseapp.com",
  projectId: "ashok-enterprises",
  storageBucket: "ashok-enterprises.firebasestorage.app",
  messagingSenderId: "1085003560709",
  appId: "1:1085003560709:web:f18e0dd5a672a643e0296c",
  measurementId: "G-LN0WZ3SMPK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);