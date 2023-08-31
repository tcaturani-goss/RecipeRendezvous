// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// allows you to connect to the db
import {getFirestore} from 'firebase/firestore'

// For auth
import {getAuth} from 'firebase/auth'

// For storage
import { getStorage } from "firebase/storage"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTSMbvNlW8U2OUkgLpztsj9moQbV3Ivjs",
  authDomain: "reciperendezvous-website.firebaseapp.com",
  projectId: "reciperendezvous-website",
  storageBucket: "reciperendezvous-website.appspot.com",
  messagingSenderId: "593618672959",
  appId: "1:593618672959:web:9891d715ecae5e96f8878a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//setup database and export it
export const db = getFirestore(app);

// Setup auth and export it
export const auth = getAuth(app)

// Setup storage and activate it
export const storage = getStorage(app)

