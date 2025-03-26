import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDB6ilG2mDruaDeOrPFkEO5S2yikUVx5ME",
  authDomain: "nticsave.firebaseapp.com",
  projectId: "nticsave",
  storageBucket: "nticsave.firebasestorage.app",
  messagingSenderId: "121725998193",
  appId: "1:121725998193:web:c9aa3aaa82a58c7f12f7d0",
  measurementId: "G-KZTTD16F28",
};

let app;
let auth;
let db;

// Initialize Firebase
try {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
  db = getFirestore(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  if (error instanceof Error) {
    console.error("Firebase initialization error", error.stack);
  } else {
    console.error("Firebase initialization error", String(error));
  }
}
export { app, auth, db };
