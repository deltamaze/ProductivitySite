// import * as firebase from 'firebase';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// dev
import firebaseConfig from '../../secrets/firebaseConfig';
// prod
// import firebaseConfig from '../../secrets/firebaseConfigProd';

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
