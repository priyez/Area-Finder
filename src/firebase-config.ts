import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage"; // Import ref

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBn-fPaRKq14vztK3i4uPW2JitjqgouYrM",
    authDomain: "area-finder-c4dd8.firebaseapp.com",
    projectId: "area-finder-c4dd8",
    storageBucket: "area-finder-c4dd8.appspot.com", // Storage bucket
    messagingSenderId: "521961545851",
    appId: "1:521961545851:web:743d57b25914bd560202de",
    measurementId: "G-LNXBXVN652"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Create a storage reference
const storageRef = ref(storage);

export { auth, db, storage, storageRef }; // Export storage and storageRef
export default db;