import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDKRrJcXzYfcw4kX4KAXFCsuSm5cZw0zGI",
  authDomain: "fitnation-d749a.firebaseapp.com",
  projectId: "fitnation-d749a",
  storageBucket: "fitnation-d749a.appspot.com",
  messagingSenderId: "240988278524",
  appId: "1:240988278524:web:c9344e35c00254fc491179",
};

export const app = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
export default db;
