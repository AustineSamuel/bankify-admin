import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
console.log(firebaseConfig);
// Initialize Firebase Initialize Firebase
const app=initializeApp(firebaseConfig);

// Get a Firestore instance
const db = getFirestore(app);
const storage=getStorage(app);
const getCollectionProps:(collectionName:string)=>string=(collectionName:string)=>{
collection(db,collectionName);
return collectionName;
}

export {db,app,getCollectionProps,storage};