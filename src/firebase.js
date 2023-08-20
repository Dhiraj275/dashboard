import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore'
import 'firebase/storage';
import 'firebase/auth'
const config = {
  apiKey: "YOUR_CRED",
  authDomain: "YOUR_CRED",
  databaseURL: "YOUR_CRED",
  projectId: "YOUR_CRED",
  storageBucket: "YOUR_CRED",
  messagingSenderId: "YOUR_CRED",
  appId: "YOUR_CRED",
  measurementId: "YOUR_CRED"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
export default firebase