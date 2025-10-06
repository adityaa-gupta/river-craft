import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDbMmk36oNMP3hKV-jEsZzK8Ak-BlPmITk",
  authDomain: "river-craft.firebaseapp.com",
  projectId: "river-craft",
  storageBucket: "river-craft.firebasestorage.app",
  messagingSenderId: "262679523148",
  appId: "1:262679523148:web:fd93dd5a3323c6fde2a9e9",
  measurementId: "G-M692CCBY13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
