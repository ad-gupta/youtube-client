import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDENY8_8GMu93Ht4TPwGMA8E6tYjV9G7s0",
  authDomain: "video-b6d07.firebaseapp.com",
  projectId: "video-b6d07",
  storageBucket: "video-b6d07.appspot.com",
  messagingSenderId: "892958106542",
  appId: "1:892958106542:web:a55183fdbdd0990c5d5e3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider()

export default app;