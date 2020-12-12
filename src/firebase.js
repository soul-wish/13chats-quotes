import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyD3vbG2tH35DcWRgcnLrEaZsm0ByiSYCqk',
  authDomain: 'chats-quotes.firebaseapp.com',
  databaseURL: 'https://chats-quotes.firebaseio.com',
  projectId: 'chats-quotes',
  storageBucket: 'chats-quotes.appspot.com',
  messagingSenderId: '757134273608',
  appId: '1:757134273608:web:7e1494362cf9b6de52fc7d',
  measurementId: 'G-9PSF71DZ1M',
};

firebase.initializeApp(firebaseConfig);

export let database = firebase.database();

export default firebase;
