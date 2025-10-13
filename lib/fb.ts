import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCS9QVrjvUxQZ_2n3O_lkmUwCBOjASoVdg",
    authDomain: "minha-mesa-posta-a4d82.firebaseapp.com",
    projectId: "minha-mesa-posta-a4d82",
    storageBucket: "minha-mesa-posta-a4d82.firebasestorage.app",
    messagingSenderId: "58544674558",
    appId: "1:58544674558:web:74439ba3d5bbad7e19b7af",
    measurementId: "G-JF1PT8R8T5"
};

// avoid reinitializing during fast refresh in Expo
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

//
export const fbDb = getFirestore(app)
export const fbAuth = getAuth(app);
export default app;