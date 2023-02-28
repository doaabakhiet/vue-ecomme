// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
require("firebase/firestore");
import "firebase/storage";
// import {getDatabase,ref} from "firebase/Database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0J-NZqxhkJ2bBo3UmpHDghNyKWjkh0B4",
  authDomain: "vueapp-3036e.firebaseapp.com",
  projectId: "vueapp-3036e",
  storageBucket: "vueapp-3036e.appspot.com",
  messagingSenderId: "974325407798",
  appId: "1:974325407798:web:5b1f230e7e3e4bd6f13897"
};

// Initialize Firebase
// const app = 

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db,createUserWithEmailAndPassword}