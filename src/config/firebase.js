// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCsx-QZSzL__76Wk-7H_BBo-7M1BgDQfrw",
  authDomain: "fir-course-a7c38.firebaseapp.com",
  projectId: "fir-course-a7c38",
  storageBucket: "fir-course-a7c38.appspot.com",
  messagingSenderId: "557185047691",
  appId: "1:557185047691:web:3f2260f3010f31c9c4088e",
  measurementId: "G-YCW4SX4DSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);