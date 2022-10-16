import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const app = firebase.initializeApp({
    apiKey: "AIzaSyD_7NSxYZCjRYQW5k1XGwqdCCemAXylwuw",
    authDomain: "dropbox-3c6ac.firebaseapp.com",
    projectId: "dropbox-3c6ac",
    storageBucket: "dropbox-3c6ac.appspot.com",
    messagingSenderId: "322287900271",
    appId: "1:322287900271:web:3c9ce20a1404127dc51f9a",
    measurementId: "G-4TMPF302M6"
  });
  export const auth = app.auth();
  export const firestore = app.firestore();
  export const database = {
      folders: firestore.collection('folders'),
      files: firestore.collection('files'),
      formatDoc: doc=>{
          return {
              id:doc.id,
                ...doc.data()
          }
      },
      getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
  }

export const storage = app.storage();
export default app;