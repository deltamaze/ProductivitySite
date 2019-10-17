/* eslint-disable */
//placeholders stuff, enable eslint when i get back to this file.

import { setAlertWithDispath } from '../alerts/action';
import firebase, { db } from '../firebase/firebase';

export const FETCHCALENDAR = 'FETCHCALENDAR';

let calRef = db.collection('users').doc('0').collection('months').doc('0'); // default unset value
let calListener = undefined;

export function fetchCalendar(uid, yearMonth) { //test for now, later change to be more like fetchAuth
  console.log('fetchCalled');
  return (dispatch) => {
    if (calListener != undefined) {
      calListener(); // Remove previous listener
    }
    try {
    calRef = db.collection('users').doc(uid).collection('months').doc(yearMonth); // default unset value
    calListener = calRef // default unset value
      .onSnapshot((doc) => {
        console.log('cal snapshot');
        console.log(doc.data());
        if (doc.data() === undefined) {
          dispatch({
            type: FETCHCALENDAR,
            payload: { calendar: null } // calendar item not set yet
          });
        } else { // cal item set, push to state
          dispatch({
            type: FETCHCALENDAR,
            payload: { username: doc.data() }
          });
        }
      });
    }
    catch(err){
      setAlertWithDispath(JSON.stringify(err));
    }
  }
}

export function setCalendar(calendar) {
  calRef.set(calendar).catch(err => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
