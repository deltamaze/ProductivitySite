import * as firebase from 'firebase';


import firebaseConfig from '../../../secrets/firebaseConfig';

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ });

export default firebase;
