// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNTDOsFTSxq8kFh8JE7rCUP0c3Nqf0vkQ",
  authDomain: "cuidatest-a8fc8.firebaseapp.com",
  projectId: "cuidatest-a8fc8",
  storageBucket: "cuidatest-a8fc8.firebasestorage.app",
  messagingSenderId: "373446025950",
  appId: "1:373446025950:web:ec97ab4ee39610dd57d84f"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
