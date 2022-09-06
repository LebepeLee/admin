// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB7VQTUfYIrcbOeCqFuZMeWJx8_uc-bNoM",
  authDomain: "hotel-app-df87f.firebaseapp.com",
  projectId: "hotel-app-df87f",
  storageBucket: "hotel-app-df87f.appspot.com",
  messagingSenderId: "610121646074",
  appId: "1:610121646074:web:0ad4fe4ea35013ab3bee43",
  measurementId: "G-5TZ5CRZYP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage =getStorage(app)


export {auth,db,storage}