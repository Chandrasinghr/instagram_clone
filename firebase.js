import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebase.initializeApp( {
    apiKey: "AIzaSyCx-H5scyYbQQ5J8cutnPO5q5bOq3k2Cd8",
    authDomain: "instagram0-67bb8.firebaseapp.com",
    databaseURL: "https://instagram0-67bb8.firebaseio.com",
    projectId: "instagram0-67bb8",
    storageBucket: "instagram0-67bb8.appspot.com",
    messagingSenderId: "5465578214",
    appId: "1:5465578214:web:e56515dc7a151ac83c3927",
    measurementId: "G-8SLK3J28NK"
  });

const db =firebase.firestore()
const auth = firebase.auth()
const storage =firebase.storage()

export{ db,auth,storage}
  