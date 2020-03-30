import { setAlertWithDispath } from '../alerts/action';
import { db } from '../firebaseContext/firebaseInitializer';

export const SETEVENT = 'SETEVENT';
export const EVENTUPSERTMODALSHOW = 'EVENTUPSERTMODALSHOW';
export const EVENTDELETEMODALSHOW = 'EVENTDELETEMODALSHOW';
export const EVENTSETTITLE = 'EVENTSETTITLE';
export const EVENTSETDESCRIPTION = 'EVENTSETDESCRIPTION';
export const EVENTSETFREQUENCY = 'EVENTSETFREQUENCY';
export const EVENTSETFREQUENCYTYPE = 'EVENTSETFREQUENCYTYPE';
export const EVENTSETWEEKPARTSELECTION = 'EVENTSETWEEKPARTSELECTION';
export const EVENTSETSTARTDATE = 'EVENTSETSTARTDATE';
export const EVENTSETENDDATE = 'EVENTSETENDDATE';
export const EVENTSETMONTHTYPESELECTION = 'EVENTSETMONTHTYPESELECTION';
export const EVENTSETMONTHPARTSELECTION = 'EVENTSETMONTHPARTSELECTION';

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
// firebase actions
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
// dispath actions for unsaved local changes
export function setEventTitle(newVal) {
  return (
    {
      type: EVENTSETTITLE,
      payload: { newVal }
    });
}

export function setEventDescription(newVal) {
  return (
    {
      type: EVENTSETDESCRIPTION,
      payload: { newVal }
    });
}

export function setEventFrequency(newVal) {
  return (
    {
      type: EVENTSETFREQUENCY,
      payload: { newVal }
    });
}

export function setEventFrequencyType(newVal) {
  return (
    {
      type: EVENTSETFREQUENCYTYPE,
      payload: { newVal }
    });
}

export function setEventWeekPartSelection(newVal) {
  return (
    {
      type: EVENTSETWEEKPARTSELECTION,
      payload: { newVal }
    });
}

export function setEventStartDate(newVal) {
  return (
    {
      type: EVENTSETSTARTDATE,
      payload: { newVal }
    });
}

export function setEventEndDate(newVal) {
  return (
    {
      type: EVENTSETENDDATE,
      payload: { newVal }
    });
}

export function setEventMonthTypeSelection(newVal) {
  return (
    {
      type: EVENTSETMONTHTYPESELECTION,
      payload: { newVal }
    });
}

export function setEventMonthPartSelection(newVal) {
  return (
    {
      type: EVENTSETMONTHPARTSELECTION,
      payload: { newVal }
    });
}
