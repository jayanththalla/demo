import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDtfe5GM3nSwuqfqFG310m7ORYHyPO2qbE",
    authDomain: "party-77dd2.firebaseapp.com",
    projectId: "party-77dd2",
    storageBucket: "party-77dd2.firebasestorage.app",
    messagingSenderId: "350333700557",
    appId: "1:350333700557:web:2d7273aa1a978ab8211c84",
    measurementId: "G-FX0047LX9J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };