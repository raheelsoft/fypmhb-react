import app from 'firebase/app';
import 'firebase/auth';

const prodFirebaseConfig = {
  apiKey: process.env.REACT_APP_PROD_API_KEY,
  authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
  projectId: process.env.REACT_APP_PROD_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
};

const devFirebaseConfig = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const firebaseConfig =
  process.env.NODE_ENV === 'production'
    ? prodFirebaseConfig
    : devFirebaseConfig;

class Firebase {
  constructor() {
    try {
      app.initializeApp(firebaseConfig);
    } catch (err) {
      // we skip the “already exists” message which is
      // not an actual error when we’re hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack);
      }
    }

    // *** Auth API ***

    this.auth = app.auth();
  }
  createUser = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  loginUser = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOutUser = () => this.auth.signOut();

  resetPassword = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.updatePassword(password);
}

export default Firebase;
