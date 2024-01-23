// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQdzAQULdHggFOAYMqojXl2jAW272alhU",
  authDomain: "sampleapp-96e62.firebaseapp.com",
  projectId: "sampleapp-96e62",
  storageBucket: "sampleapp-96e62.appspot.com",
  messagingSenderId: "490013558798",
  appId: "1:490013558798:web:313d44cf688a96cdb1d45f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)