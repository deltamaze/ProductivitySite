/* eslint-disable */
//placeholders stuff, enable eslint when i get back to this file.

import { setAlertWithDispath } from '../alerts/action';
import firebase, { db } from '../firebase/firebase';

export const UPSERTCURRENTPLANNER = 'UPSERTCURRENTPLANNER';

let plannerRef; //= db.collection('users').doc('0'); // default unset value

let plannerListener ;
// = usernameRef.onSnapshot((doc) => {
//   // eslint-disable-next-line no-console
//   console.log('Current data: ', doc.data());
// });


// export function fetchPlanner() {
//   return (dispatch) => {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         dispatch({
//           type: UPSERTUSERINFO,
//           payload: { uid: user.uid }
//         });
//       } else {
//         // let state know that not logged in
//         dispatch({
//           type: UPSERTUSERINFO,
//           payload: { uid: 'NotLoggedIn' }
//         });
//       }
//     });
//   };
// }

