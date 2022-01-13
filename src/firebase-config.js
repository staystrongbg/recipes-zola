import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_RECEPTI_KEY,
  authDomain: process.env.REACT_APP_RECEPTI_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_RECEPTI_PROJECTID,
  storageBucket: process.env.REACT_APP_RECEPTI_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_RECEPTI_MESSAGING_SENDER,
  appId: process.env.REACT_APP_RECEPTI_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_RECEPTI_MESSUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const gitProvider = new GithubAuthProvider();

// apiKey: process.env.REACT_APP_RECEPTI_KEY,
// authDomain: process.env.REACT_APP_RECEPTI_AUTH_DOMAIN,
// projectId: process.env.REACT_APP_RECEPTI_PROJECTID,
// storageBucket: process.env.REACT_APP_RECEPTI_STORAGE_BUCKET,
// messagingSenderId: process.env.REACT_APP_RECEPTI_MESSAGING_SENDER,
// appId: process.env.REACT_APP_RECEPTI_FIREBASE_APP_ID,
// measurementId: process.env.REACT_APP_RECEPTI_MESSUREMENT_ID,
