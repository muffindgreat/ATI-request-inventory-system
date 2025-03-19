// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmLsIQV3w7NLCc29gOhgPy3XsIlq9k6Zk",
  authDomain: "cartest-da432.firebaseapp.com",
  projectId: "cartest-da432",
  storageBucket: "cartest-da432.appspot.com",
  messagingSenderId: "729144303070",
  appId: "1:729144303070:web:e461d55f5e2c311b5b514f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Ensure Firestore is initialized and exported
