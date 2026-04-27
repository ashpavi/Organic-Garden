import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

let auth = null;
let db = null;
let storage = null;

try {
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase auth failed to initialize:", error);
}

try {
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase Firestore failed to initialize:", error);
}

try {
  storage = getStorage(app);
} catch (error) {
  console.error("Firebase Storage failed to initialize:", error);
}

export { auth, db, storage };