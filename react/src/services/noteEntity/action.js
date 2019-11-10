import { setAlertWithDispath } from '../alerts/action';
import { db } from '../firebaseContext/firebaseInitializer';

export const SETNOTE = 'SETNOTE';

let noteRef;
let noteListener;

export function removeNoteListener() { // test for now, later change to be more like fetchAuth
  return (dispatch) => {
    if (noteListener != undefined) {
      noteListener(); // Remove previous listener
      dispatch({
        type: SETNOTE,
        payload: { noteData: 'Loading' } // month item not set yet
      });// notify view that new month will be loading
    }
  };
}


export function fetchNote(uid, itemId) { // test for now, later change to be more like fetchAuth
  return (dispatch) => {
    removeNoteListener();
    try {
      noteRef = db.collection('users').doc(uid).collection('noteContent').doc(itemId); // default unset value
      noteListener = noteRef // default unset value
        .onSnapshot((doc) => {
          if (doc.data() === undefined) {
            dispatch({
              type: SETNOTE,
              payload: { noteData: undefined } // month item not set yet
            });
          } else { // cal item set, push to state
            dispatch({
              type: SETNOTE,
              payload: { noteData: doc.data() }
            });
          }
        });
    } catch (err) {
      setAlertWithDispath(JSON.stringify(err));
    }
  };
}


export function setNoteContent(note, itemId, uid) {
  db.collection('users').doc(uid).collection('itemIndex').doc(itemId)
    .set(note)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
