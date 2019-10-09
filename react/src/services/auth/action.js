/* eslint-disable no-console */

import firebase, { db } from '../firebase/firebase';
import { setAlertWithDispath } from '../alerts/action';


export const UPSERTUSERINFO = 'UPSERTUSERINFO';


console.log(db);
let usernameRef = db.collection('SGAccounts').doc('0'); // default unset value
console.log(usernameRef);
let usernameListener = usernameRef.onSnapshot((doc) => {
  // eslint-disable-next-line no-console
  console.log('Current data: ', doc.data());
});
console.log(usernameListener);

// ACTION GENERATORS
export function fetchAuth() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // set up watcher on username for this user
        usernameListener(); // Remove previous listener
        usernameRef = db.collection('SGAccounts').doc(user.uid);
        usernameListener = usernameRef // default unset value
          .onSnapshot((doc) => {
            if (doc.data() === undefined || doc.data().username === undefined) {
              dispatch({
                type: UPSERTUSERINFO,
                payload: { username: '', uid: user.uid } // username not set yet
              });
            } else { // username set, push to state
              dispatch({
                type: UPSERTUSERINFO,
                payload: { username: doc.data().username, uid: user.uid }
              });
            }
          });
      } else {
        // let state know that not logged in
        dispatch({
          type: UPSERTUSERINFO,
          payload: { username: '', uid: '' }
        });
        // try to log in
        firebase.auth().signInAnonymously();
      }
    });
  };
}
// let usernameDoc = db.collection('SGAccounts').doc('');

// function fetchUsername() {
//   return (dispatch) => {
//     let usernameObs = firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         dispatch({
//           type: LOGIN,
//           payload: { uid: user.uid, userRole: 'admin' }
//         });
//       } else {
//         // let state know that not logged in
//         dispatch({
//           type: LOGOUT
//         });
//         // try to log in
//         firebase.auth().signInAnonymously();
//       }
//     });
//   };
// }

export function login() {
  return () => firebase.auth().signInAnonymously();
}
export function setUsername(username) {
  const data = {
    username // shorthand for username: username
  };
  usernameRef.set(data).catch(err => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}


export function logout() {
  return () => firebase.auth().signOut();
}
