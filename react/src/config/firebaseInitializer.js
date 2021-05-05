// import * as firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';

// dev
// import firebaseConfig from '../../secrets/firebaseConfig';
// prod
import firebaseConfig from '../../secrets/firebaseConfigProd';

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const rtdb = firebase.database();
export default firebase;
