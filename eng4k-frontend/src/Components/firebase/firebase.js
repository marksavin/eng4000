import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCf3hsES6yZFc6a8tY24ZMUHPb-iRcijPc",
    authDomain: "eng4000-6e1fd.firebaseapp.com",
    databaseURL: "https://eng4000-6e1fd-default-rtdb.firebaseio.com",
    projectId: "eng4000-6e1fd",
    storageBucket: "eng4000-6e1fd.appspot.com",
    messagingSenderId: "627878966971",
    appId: "1:627878966971:web:ac8b8f2bb76e09891e9b9e",
    measurementId: "G-868SJF08XC"
  };

firebase.initializeApp(firebaseConfig); // firebase.initializeApp gives us access to our database by passing in firebaseConfig as the argument

const database = firebase.database();

database.ref().set({
    name: "Mark"
}).then(() => {
    console.log('Resolved!');
});