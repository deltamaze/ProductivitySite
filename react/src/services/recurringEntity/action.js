import { setAlertWithDispath } from '../alerts/action';
import { db } from '../firebaseContext/firebaseInitializer';

export const SETRECURRINGEVENT = 'SETRECURRINGEVENT';

let recurringEventRef;
let recurringEventListener;

export function removeRecurringEventEventListener() {
  return (dispatch) => {
    if (recurringEventListener != undefined) {
      recurringEventListener(); // Remove previous listener
      dispatch({
        type: SETRECURRINGEVENT,
        payload: { recurringEventData: 'Loading' } // recurEvent item not set yet
      });// notify view that new recurEvent will be loading
    }
  };
}


export function fetchRecurEvent(uid) {
  return (dispatch) => {
    removeRecurringEventEventListener();
    try {
      recurringEventRef = db.collection('users').doc(uid).collection('recurringEvents'); // default unset value
      recurringEventListener = recurringEventRef // default unset value
        .onSnapshot((results) => {
          dispatch({
            type: SETRECURRINGEVENT,
            payload: { recurringEventData: results.docs }
          });
        });
    } catch (err) {
      setAlertWithDispath(JSON.stringify(err));
    }
  };
}


export function addRecurringEvent(event, uid) {
  db.collection('users').doc(uid).collection('recurringEvents')
    .add(event)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function setRecurringEvent(event, eventId, uid) {
  db.collection('users').doc(uid).collection('recurringEvents').doc(eventId)
    .set(event)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function deleteRecurringEvent(eventId, uid) {
  // delete index
  db.collection('users').doc(uid).collection('recurringEvents').doc(eventId)
    .delete()
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
