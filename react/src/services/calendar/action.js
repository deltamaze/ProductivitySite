/* eslint-disable */
//placeholders stuff, enable eslint when i get back to this file.

import { setAlertWithDispath } from '../alerts/action';
import firebase, { db } from '../firebase/firebase';

export const FETCHCALENDAR = 'FETCHCALENDAR';

let calRef = db.collection('users').doc('0').collection('yearmonth').doc('0'); // default unset value
console.log(calRef);
let calListener = calRef.onSnapshot((doc) => {
  console.log('Current data: ', doc.data());
});
console.log(calListener);

export function fetchCalendar(uid, yearMonth) { //test for now, later change to be more like fetchAuth
  return (dispatch) => {
    calListener(); // Remove previous listener
    usernameRef = db.collection('users').doc(uid).collection('yearmonth').doc(yearMonth); // default unset value
    calListener = usernameRef // default unset value
      .onSnapshot((doc) => {
        if (doc.data() === undefined) {
          dispatch({
            type: FETCHCALENDAR,
            payload: { calendar: null } // username not set yet
          });
        } else { // username set, push to state
          dispatch({
            type: FETCHCALENDAR,
            payload: { username: doc.data() }
          });
        }
      });
  }
}

export function setUsername(username) {
  const data = {
    username // shorthand for username: username
  };
  calRef.set(data).catch(err => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
