import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBxyuPFuVZ4_yXzVE9u62l0Qdem0dfyxRE",
  authDomain: "company-portfolio-f3520.firebaseapp.com",
  projectId: "company-portfolio-f3520",
  storageBucket: "company-portfolio-f3520.appspot.com",
  messagingSenderId: "732440270148",
  appId: "1:732440270148:web:82d657b9fb25d238af7311",
  measurementId: "G-5PNPWFD6SB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };





