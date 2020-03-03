import { setAlertWithDispath } from '../alerts/action';
import { db } from '../firebaseContext/firebaseInitializer';

export const SETEVENT = 'SETEVENT';
export const EVENTUPSERTMODALSHOW = 'EVENTUPSERTMODALSHOW';
export const EVENTDELETEMODALSHOW = 'EVENTDELETEMODALSHOW';

let eventRef;
let eventListener;

export function removeEventListener() {
  return (dispatch) => {
    if (eventListener != undefined) {
      eventListener(); // Remove previous listener
      dispatch({
        type: SETEVENT,
        payload: { eventData: 'Loading' } // Event item not set yet
      });// notify view that new Event will be loading
    }
  };
}


export function fetchEvents(uid) {
  return (dispatch) => {
    removeEventListener();
    try {
      eventRef = db.collection('users').doc(uid).collection('events'); // default unset value
      eventListener = eventRef // default unset value
        .onSnapshot((results) => {
          dispatch({
            type: SETEVENT,
            payload: { eventData: results.docs }
          });
        });
    } catch (err) {
      setAlertWithDispath(JSON.stringify(err));
    }
  };
}

export function toggleUpsertModal(isHidden) {
  return (
    {
      type: EVENTUPSERTMODALSHOW,
      payload: { isHidden }
    });
}

export function toggleDeleteModal(isHidden) {
  return (
    {
      type: EVENTDELETEMODALSHOW,
      payload: { isHidden }
    });
}

function addEvent(event, uid) {
  db.collection('users').doc(uid).collection('events')
    .add(event)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function setEvent(event, eventId, uid) {
  // if the id = 0, then add as a new event
  if (eventId === 0) {
    addEvent(event, uid);
  }

  db.collection('users').doc(uid).collection('events').doc(eventId)
    .set(event)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function deleteEvent(eventId, uid) {
  // delete index
  db.collection('users').doc(uid).collection('events').doc(eventId)
    .delete()
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
