import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCjU0Pk6V_Q5y1R60ReAIHeyHHeIa2njCc",
    authDomain: "crwn-db-73a5c.firebaseapp.com",
    databaseURL: "https://crwn-db-73a5c.firebaseio.com",
    projectId: "crwn-db-73a5c",
    storageBucket: "crwn-db-73a5c.appspot.com",
    messagingSenderId: "940647443723",
    appId: "1:940647443723:web:11f91b8e0b86925c8e860e",
    measurementId: "G-J1YRHX38WL"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error){
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;