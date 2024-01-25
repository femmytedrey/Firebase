import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCsx-QZSzL__76Wk-7H_BBo-7M1BgDQfrw",
  authDomain: "fir-course-a7c38.firebaseapp.com",
  projectId: "fir-course-a7c38",
  storageBucket: "fir-course-a7c38.appspot.com",
  messagingSenderId: "557185047691",
  appId: "1:557185047691:web:3f2260f3010f31c9c4088e",
  measurementId: "G-YCW4SX4DSX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)