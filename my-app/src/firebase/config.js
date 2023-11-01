import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBAbApcWm_Rb-h5_ooDPp5P6v2dCdDrZ2I",
  authDomain: "progra3proyecto2.firebaseapp.com",
  projectId: "progra3proyecto2",
  storageBucket: "progra3proyecto2.appspot.com",
  messagingSenderId: "54820855574",
  appId: "1:54820855574:web:ce80d27f996309052b3a37",
  measurementId: "G-BM47R1EN9T"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const storage = app.storage()
export const db = app.firestore()
