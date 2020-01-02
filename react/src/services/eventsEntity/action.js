import { setAlertWithDispath } from '../alerts/action';
import { db } from '../firebaseContext/firebaseInitializer';

export const SETEVENTS = 'SETEVENTS';

let eventsRef;
let eventListener;

// eslint-disable-next-line no-unused-vars
export function fetchEvents(uid, startDate) {
  // const startRange = startDate;
  return (dispatch) => {
    if (eventListener != undefined) {
      eventListener(); // Remove previous listener
      dispatch({
        type: SETEVENTS,
        payload: { eventData: 'Loading' } // month item not set yet
      });// notify view that new month will be loading
    }
    try {
      eventsRef = db.collection('users').doc(uid).collection('events'); // default unset value
      eventListener = eventsRef.where('targetDate', '>=', 0).where('targetDate', '<=', 0) // grab events 30 days before, and 60 days after startDate
        .onSnapshot((results) => {
          dispatch({
            type: SETEVENTS,
            payload: { eventData: results.docs }
          });
        });
    } catch (err) {
      setAlertWithDispath(JSON.stringify(err));
    }
  };
}

export function addEvent(event, uid) {
  db.collection('users').doc(uid).collection('events')
    .add(event)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function setEvent(event, eventId, uid) {
  db.collection('users').doc(uid).collection('events').doc(eventId)
    .set(event)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function deleteEvent(eventId, uid) {
  db.collection('users').doc(uid).collection('events').doc(eventId)
    .delete()
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
