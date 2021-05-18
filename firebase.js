import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDInCnN8L9Rvx1byGuAgnIvqQpmk_cZgiA",
  authDomain: "my-whatsapp-82068.firebaseapp.com",
  projectId: "my-whatsapp-82068",
  storageBucket: "my-whatsapp-82068.appspot.com",
  messagingSenderId: "392549045842",
  appId: "1:392549045842:web:445436123b6a727852318b",
  measurementId: "G-2XJS7Y5VEV",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
