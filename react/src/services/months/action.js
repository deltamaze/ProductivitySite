/* eslint-disable */
//placeholders stuff, enable eslint when i get back to this file.

import { setAlertWithDispath } from '../alerts/action';
import firebase, { db } from '../firebase/firebase';

export const FETCHMONTH = 'FETCHMONTH';
// TODO make dispatch to set monthRef to Loading when Ref updated
// and make UI lock controls until snapshot dispatch called

let monthRef = db.collection('users').doc('0').collection('months').doc('0'); // default unset value
let monthListener = undefined;

export function fetchMonth(uid, yearMonth) { //test for now, later change to be more like fetchAuth
  return (dispatch) => {

    if (monthListener != undefined) {
      monthListener(); // Remove previous listener
    }
    try {
    monthRef = db.collection('users').doc(uid).collection('months').doc(yearMonth); // default unset value
    monthListener = monthRef // default unset value
      .onSnapshot((doc) => {
        if (doc.data() === undefined) {
          dispatch({
            type: FETCHMONTH,
            payload: { month: undefined,monthRef:yearMonth } // month item not set yet
          });
        } else { // cal item set, push to state
          dispatch({
            type: FETCHMONTH,
            payload: { month: doc.data(),monthRef:yearMonth }
          });
        }
      });
    }
    catch(err){
      setAlertWithDispath(JSON.stringify(err));
    }
  }
}

export function setMonth(monthData,yearMonth,uid) {
  // due to debounce and swapping months, sometimes we can save data for the wrong monthRef
  // so instead of re-using ref, just push up with a local ref.
  db.collection('users').doc(uid).collection('months').doc(yearMonth).set(monthData).catch(err => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
