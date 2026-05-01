import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcPSoUqft8gc_ztjzBXWyfOZdSyHz6P8g",
  authDomain: "tktek-practice.firebaseapp.com",
  projectId: "tktek-practice",
  storageBucket: "tktek-practice.firebasestorage.app",
  messagingSenderId: "49571060194",
  appId: "1:49571060194:web:64fba950759ac6dcf541bb",
  measurementId: "G-7MRG2YPF4G"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);