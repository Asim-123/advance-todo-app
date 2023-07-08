import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC0aMfA4Dlr7ZRBYgDNa2qOvSVv3uMWSuc",
  authDomain: "todo-app-90908.firebaseapp.com",
  projectId: "todo-app-90908",
  storageBucket: "todo-app-90908.appspot.com",
  messagingSenderId: "515728576848",
  appId: "1:515728576848:web:975d82b592ebfe41c8dc55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, provider, firestore };
