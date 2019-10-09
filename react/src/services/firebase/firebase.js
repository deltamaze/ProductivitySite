import * as firebase from 'firebase';


import firebaseConfig from '../../../secrets/firebaseConfig';

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

export default firebase;
