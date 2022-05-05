const firebaseConfig = {
  apiKey: 'AIzaSyAFR-7zSfpbX56-EchZy4IxUKWvDr1lLaQ',
  authDomain: 'test-website-with-login.firebaseapp.com',
  projectId: 'test-website-with-login',
  storageBucket: 'test-website-with-login.appspot.com',
  messagingSenderId: '505773393237',
  appId: '1:505773393237:web:45e3cc45aa8e3b9e22dbdc',
};

firebase.initializeApp(firebaseConfig);
const dbconnection = firebase.firestore();
const storageconnection = firebase.storage();
