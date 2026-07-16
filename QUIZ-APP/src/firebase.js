import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Aapki absolute custom configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJ5iiVNQMMGrwipDP6NBVDgx5AxIpH2vQ",
  authDomain: "cyber-quiz-app-8d55a.firebaseapp.com",
  projectId: "cyber-quiz-app-8d55a",
  storageBucket: "cyber-quiz-app-8d55a.firebasestorage.app",
  messagingSenderId: "653919355617",
  appId: "1:653919355617:web:fb21388cf106fbb468eda0",
  measurementId: "G-C3M9HZYJLZ"
};

// Initialize Firebase Instance
const app = initializeApp(firebaseConfig);

// Export Auth Engine for Context Provider
export const auth = getAuth(app);
export default app;