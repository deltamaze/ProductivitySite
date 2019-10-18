/* eslint-disable */
//placeholders stuff, enable eslint when i get back to this file.

import { setAlertWithDispath } from '../alerts/action';
import firebase, { db } from '../firebase/firebase';

export const FETCHMONTH = 'FETCHMONTH';

let monthRef = db.collection('users').doc('0').collection('months').doc('0'); // default unset value
let monthListener = undefined;

export function fetchMonth(uid, yearMonth) { //test for now, later change to be more like fetchAuth
  console.log('fetchCalled');
  return (dispatch) => {
    if (monthListener != undefined) {
      monthListener(); // Remove previous listener
    }
    try {
    monthRef = db.collection('users').doc(uid).collection('months').doc(yearMonth); // default unset value
    monthListener = monthRef // default unset value
      .onSnapshot((doc) => {
        console.log('cal snapshot');
        console.log(doc.data());
        if (doc.data() === undefined) {
          dispatch({
            type: FETCHMONTH,
            payload: { month: null } // month item not set yet
          });
        } else { // cal item set, push to state
          dispatch({
            type: FETCHMONTH,
            payload: { month: doc.data() }
          });
        }
      });
    }
    catch(err){
      setAlertWithDispath(JSON.stringify(err));
    }
  }
}

export function setMonth(month) {
  //set local planner/journal state
  //debounce save firebase
  monthRef.set(month).catch(err => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
