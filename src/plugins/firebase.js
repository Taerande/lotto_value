import firebase from "firebase/compat/app";
import 'firebase/compat/database';
import firebaseConfig from '../../firebaseConfig';
import Vue from "vue";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
Vue.prototype.$rtdb = firebase.database();