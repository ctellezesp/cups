import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyDMqliuDS8ehRF9JgMlbl1KLTPADq8xUKk",
    authDomain: "european-cups.firebaseapp.com",
    databaseURL: "https://european-cups.firebaseio.com",
    projectId: "european-cups",
    storageBucket: "european-cups.appspot.com",
    messagingSenderId: "761003051853",
    appId: "1:761003051853:web:052c68094b9574993ac504",
    measurementId: "G-5D5DK9F5MV"
}
class Firebase{

  constructor(){
      firebase.initializeApp(config);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.storage = firebase.storage();
      this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }
}

export default new Firebase();
