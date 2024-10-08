
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {  getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-4a76d.firebaseapp.com",
  projectId: "reactchat-4a76d",
  storageBucket: "reactchat-4a76d.appspot.com",
  messagingSenderId: "243203581281",
  appId: "1:243203581281:web:065003ef0ec5c170959120"
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const sotrage=getStorage(app);
