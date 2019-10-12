/* eslint-disable */
//placeholders stuff, enable eslint when i get back to this file.

import { setAlertWithDispath } from '../alerts/action';
import firebase, { db } from '../firebase/firebase';

export const FETCHCALENDAR = 'FETCHCALENDAR';

export function fetchCalendar(uid,date) { //test for now, later change to be more like fetchAuth
  console.log(`fetchCalendar called, uid`)
  return (
    {
      type: FETCHCALENDAR,
      payload: { uid,date }
    });
}

export function updateTargetDateReference(date,prevDate) {
  // firebase collection using yearmonth granularity
  // only update reference if yearmonth changed
  // compare date/prevDate to do this.
}

// let plannerRef; //= db.collection('users').doc('0'); // default unset value

// let plannerListener ;
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

