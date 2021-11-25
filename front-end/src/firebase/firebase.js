// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {getFirestore, collection, getDoc, getDocs} from "@firebase/firestore";
import store from "src/store/store";
import { handleLogin } from "src/store/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLInPQvOc55i8cOAfUd6N21NY3KdsCpEY",
  authDomain: "quizhall-d1667.firebaseapp.com",
  databaseURL: "https://quizhall-d1667-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quizhall-d1667",
  storageBucket: "quizhall-d1667.appspot.com",
  messagingSenderId: "769976307189",
  appId: "1:769976307189:web:1a6406df0bde1cba39a4bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
export const teachersDB = collection(db, 'teachers');
export const snapshot = await getDocs(teachersDB);

console.log('### INITIALIZE FIREBASE');
onAuthStateChanged(auth, user => {
    if(user !== null) {
      if(user) store.dispatch(handleLogin({accessToken: user.accessToken}));
      // console.log('loged in!');
    } else {
      // console.log('No User'); 
    };
});

export default app;
