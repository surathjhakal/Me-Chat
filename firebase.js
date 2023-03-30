import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCrGKrF-07ExegD6yC0M-WxU2aLq-K80Dg",
  authDomain: "me-chat-52567.firebaseapp.com",
  projectId: "me-chat-52567",
  storageBucket: "me-chat-52567.appspot.com",
  messagingSenderId: "300977254919",
  appId: "1:300977254919:web:7d814ae7d7c7592b61f0a2",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
