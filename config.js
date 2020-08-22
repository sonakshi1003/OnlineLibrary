import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBZjppe1p3nWy74dArXZqbi6rIgEmKakoY",
  authDomain: "onlinelibrary-7caee.firebaseapp.com",
  databaseURL: "https://onlinelibrary-7caee.firebaseio.com",
  projectId: "onlinelibrary-7caee",
  storageBucket: "onlinelibrary-7caee.appspot.com",
  messagingSenderId: "136102207734",
  appId: "1:136102207734:web:1c4489ff2bf6ad0a898cd7"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
