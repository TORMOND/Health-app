// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { getFirestore, collection, addDoc, doc, getDocs, setDoc,  serverTimestamp, query, where, orderBy,  onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDSAbQg_Xltem2pTqvTbAHq7m0GaaB6Rnk",
  authDomain: "health-care-9e986.firebaseapp.com",
  projectId: "health-care-9e986",
  storageBucket: "health-care-9e986.appspot.com",
  messagingSenderId: "1079454089726",
  appId: "1:1079454089726:web:8426423854994648dd00af",
  measurementId: "G-9GQLVM4MD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);


const user = auth.currentUser;

export {
  app, db, auth, firebaseConfig, user, analytics, createUserWithEmailAndPassword, signInWithEmailAndPassword, collection, signOut, setDoc, getDocs, onAuthStateChanged, doc,
  getStorage, ref, uploadBytes, getDownloadURL, listAll,  serverTimestamp, addDoc, query, where,  onSnapshot, orderBy, updateDoc 
}


