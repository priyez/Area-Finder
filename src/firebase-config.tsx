import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig: Object = {
    apiKey: "AIzaSyBn-fPaRKq14vztK3i4uPW2JitjqgouYrM",
    authDomain: "area-finder-c4dd8.firebaseapp.com",
    projectId: "area-finder-c4dd8",
    storageBucket: "area-finder-c4dd8.appspot.com",
    messagingSenderId: "521961545851",
    appId: "1:521961545851:web:743d57b25914bd560202de",
    measurementId: "G-LNXBXVN652"

//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
