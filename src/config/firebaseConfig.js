// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFgdctaGDqyphLoM3_HJf0adKeeSrEqIo",
  authDomain: "da-ati-iec.firebaseapp.com",
  projectId: "da-ati-iec",
  storageBucket: "da-ati-iec.firebasestorage.app",
  messagingSenderId: "716861296457",
  appId: "1:716861296457:web:b6b6f4dd3f3a9fabb15498",
  measurementId: "G-E98YG9FZ8T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();
export const database = getDatabase(app);
// const analytics = getAnalytics(app);
