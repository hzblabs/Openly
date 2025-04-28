// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkN1Vwyoc1X4S87LnkmM72RxZgxP_7J5g",
  authDomain: "openly-app.firebaseapp.com",
  projectId: "openly-app",
  storageBucket: "openly-app.firebasestorage.app",
  messagingSenderId: "700007469627",
  appId: "1:700007469627:web:e50f3aa553e74adeca821e",
  measurementId: "G-S32PHE47VV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
