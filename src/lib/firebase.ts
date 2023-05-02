// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
import "firebase/compat/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJx01y6L9GDuqhh-iIVxHbmZHgAO-mSog",
  authDomain: "todo-c1bcd.firebaseapp.com",
  projectId: "todo-c1bcd",
  storageBucket: "todo-c1bcd.appspot.com",
  messagingSenderId: "667230689114",
  appId: "1:667230689114:web:35e0f8dba1146e0f444563",
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
export const dbService = firebase.firestore()
// export const authService = firebase.auth()
export const storage = firebase.storage()
