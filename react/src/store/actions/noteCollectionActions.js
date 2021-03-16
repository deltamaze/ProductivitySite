import { setAlertWithDispatch } from './alertActions';
import { db } from '../../config/firebaseInitializer';

export const SETNOTE = 'SETNOTE';

let noteRef;
let noteListener;

export function removeNoteListener() {
    return (dispatch) => {
        if (noteListener != undefined) {
            noteListener(); // Remove previous listener
            dispatch({
                type: SETNOTE,
                payload: { noteData: 'Loading' } // note item not set yet
            });// notify view that new note will be loading
        }
    };
}

export function fetchNote(uid, itemId) { // test for now, later change to be more like fetchAuth
    return (dispatch) => {
        removeNoteListener();
        try {
            noteRef = db.collection('users').doc(uid).collection('noteContent').doc(itemId);
            noteListener = noteRef // default unset value
                .onSnapshot((doc) => {
                    if (doc.data() === undefined) {
                        dispatch({
                            type: SETNOTE,
                            payload: { noteData: undefined } // note item not set yet
                        });
                    } else { // cal item set, push to state
                        dispatch({
                            type: SETNOTE,
                            payload: { noteData: doc.data() }
                        });
                    }
                });
        } catch (err) {
            setAlertWithDispatch(JSON.stringify(err));
        }
    };
}

export function setNoteContent(note, itemId, uid) {
    db.collection('users').doc(uid).collection('noteContent').doc(itemId)
        .set(note)
        .catch((err) => setAlertWithDispatch(JSON.stringify(err)));
    return () => { };
}
