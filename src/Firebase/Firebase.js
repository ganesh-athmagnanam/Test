import firebase from 'firebase';
const  firebaseConfig = {
    apiKey: "AIzaSyCbwbwOVlkDO-tGo7ogu1cYW_pXUihj5dA",
    authDomain: "crisis-8cb42.firebaseapp.com",
    projectId: "crisis-8cb42",
    storageBucket: "crisis-8cb42.appspot.com",
    messagingSenderId: "301010701623",
    appId: "1:301010701623:web:84854e26a4d2d2d4f1deb2"
  };
 const database=firebase.initializeApp(firebaseConfig);
 
 export default database;