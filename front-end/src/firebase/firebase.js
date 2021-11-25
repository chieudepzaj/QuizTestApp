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
export const teachersRef = collection(db, 'teachers');
// export const snapshot = getDocs(teachersDB);

console.log('### INITIALIZE FIREBASE');
onAuthStateChanged(auth, user => {
    if(user !== null) {
      store.dispatch(handleLogin({accessToken: user.accessToken}));
      console.log('### LOGED IN !');

      // if() {
      //   openCustomNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Sign out failed', '');
      //    console.log('### EMAIL NOT VERIFIED !');
      // }

//       import { collection, doc, setDoc } from "firebase/firestore"; 

// const citiesRef = collection(db, "cities");

// await setDoc(doc(citiesRef, "SF"), {
//     name: "San Francisco", state: "CA", country: "USA",
//     capital: false, population: 860000,
//     regions: ["west_coast", "norcal"] });

    } else {
      console.log('### NO USER'); 
    };
});

export default app;
