import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmPDyB2ygqhq13fY3zCVe5WhX9V7AMpaQ",
  authDomain: "typing-website-5a8b3.firebaseapp.com",
  projectId: "typing-website-5a8b3",
  storageBucket: "typing-website-5a8b3.appspot.com",
  messagingSenderId: "125933442695",
  appId: "1:125933442695:web:5dfbbac6e6a204f7fd0a22",
  measurementId: "G-V7B9EJWN7S",
};

const firebaseapp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
