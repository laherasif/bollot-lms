import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDeROBvn2qNVeANwfqkkcLMZJac4mbrPPQ",
    authDomain: "bolloot-13aba.firebaseapp.com",
    projectId: "bolloot-13aba",
    storageBucket: "bolloot-13aba.appspot.com",
    messagingSenderId: "1049994665620",
    appId: "1:1049994665620:web:fa574efc2ab0e3c55e1e81",
    measurementId: "G-HQQ2GX09Z8"
  };
  
  // Initialize Firebase

   

   const Firebaseapp = initializeApp(firebaseConfig);
   const db = getFirestore();

   export { Firebaseapp , db}