// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvyK5k67Wli26DwkS76pZ6s5TPMU21qWo",
  authDomain: "devhome-dff34.firebaseapp.com",
  projectId: "devhome-dff34",
  storageBucket: "devhome-dff34.firebasestorage.app",
  messagingSenderId: "998463764429",
  appId: "1:998463764429:web:090c78bae76e0cda113684",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
