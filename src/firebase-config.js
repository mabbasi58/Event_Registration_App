import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { ref } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyD-nzZ34ZiCJJ2g4xtvfvm75WWqJhjUq8M",
  authDomain: "eventform-fb4f1.firebaseapp.com",
  projectId: "eventform-fb4f1",
  storageBucket: "eventform-fb4f1.appspot.com",
  messagingSenderId: "159660947476",
  appId: "1:159660947476:web:a88a3fac222868b5d3cf01",
  measurementId: "G-7CCVSWYYQH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { ref,auth, db, storage };
