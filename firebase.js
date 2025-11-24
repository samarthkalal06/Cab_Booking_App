// firebase.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ⭐ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyC2v6G8qEsH2WmXScihO-INTHmpfWMcjBA",
  authDomain: "cabapp-3d6da.firebaseapp.com",
  projectId: "cabapp-3d6da",
  storageBucket: "cabapp-3d6da.firebasestorage.app",
  messagingSenderId: "211740582878",
  appId: "1:211740582878:web:7ded02f6168e5f7311334f",
};

// ⭐ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ⭐ Initialize Auth WITH persistence (VERY IMPORTANT for APK)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// ⭐ Firestore Database
export const db = getFirestore(app);
