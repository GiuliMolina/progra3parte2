import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBPxgpPMKINI5dLDzHq5vdqLujKsJH2gG8",
  authDomain: "clase15-7303d.firebaseapp.com",
  projectId: "clase15-7303d",
  storageBucket: "clase15-7303d.appspot.com",
  messagingSenderId: "1046871962719",
  appId: "1:1046871962719:web:3398f1d765ccc6625797ea",
  measurementId: "G-HVQNYZNVLG"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()
