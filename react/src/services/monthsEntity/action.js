import { setAlertWithDispath } from '../alerts/action';
import { db } from '../firebaseContext/firebaseInitializer';

export const FETCHMONTH = 'FETCHMONTH';
// TODO make dispatch to set monthRef to Loading when Ref updated
// and make UI lock controls until snapshot dispatch called

let monthRef;
let monthListener;

export function fetchMonth(uid, yearMonth) { // test for now, later change to be more like fetchAuth
  return (dispatch) => {
    if (monthListener != undefined) {
      monthListener(); // Remove previous listener
      dispatch({
        type: FETCHMONTH,
        payload: { monthData: 'Loading', monthRef: 0 } // month item not set yet
      });// notify view that new month will be loading
    }
    try {
      monthRef = db.collection('users').doc(uid).collection('months').doc(yearMonth); // default unset value
      monthListener = monthRef // default unset value
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            dispatch({
              type: FETCHMONTH,
              payload: { monthData: undefined, monthRef: yearMonth } // month item not set yet
            });
          } else { // cal item set, push to state
            dispatch({
              type: FETCHMONTH,
              payload: { monthData: doc.data(), monthRef: yearMonth }
            });
          }
        });
    } catch (err) {
      setAlertWithDispath(JSON.stringify(err));
    }
  };
}

export function setMonth(monthData, yearMonth, uid) {
  // due to debounce and swapping months, sometimes we can save data for the wrong monthRef
  // so instead of re-using ref, just push up with a local ref.
  db.collection('users').doc(uid).collection('months').doc(yearMonth)
    .set(monthData)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
