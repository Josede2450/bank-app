// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "bank-app-ec6d3.firebaseapp.com",
  projectId: "bank-app-ec6d3",
  storageBucket: "bank-app-ec6d3.appspot.com",
  messagingSenderId: "419720294695",
  appId: "1:419720294695:web:a440eed43df9739300b902",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
