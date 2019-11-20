import { setAlertWithDispath } from '../alerts/action';
import { db } from '../firebaseContext/firebaseInitializer';

export const SETITEMINDEX = 'SETITEMINDEX';

let itemIndexRef;
let itemIndexListener;

export function fetchItemIndex(uid) { // test for now, later change to be more like fetchAuth
  return (dispatch) => {
    if (itemIndexListener != undefined) {
      itemIndexListener(); // Remove previous listener
      dispatch({
        type: SETITEMINDEX,
        payload: { items: 'Loading' } // month item not set yet
      });// notify view that new month will be loading
    }
    try {
      itemIndexRef = db.collection('users').doc(uid).collection('itemIndex').orderBy('itemTitle'); // default unset value
      itemIndexListener = itemIndexRef // default unset value
        .onSnapshot((results) => {
          dispatch({
            type: SETITEMINDEX,
            payload: { items: results.docs }
          });
        });
    } catch (err) {
      setAlertWithDispath(JSON.stringify(err));
    }
  };
}

export function addItem(item, uid) {
  db.collection('users').doc(uid).collection('itemIndex')
    .add(item)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
export function addItemWithRedirect(item, uid, callback) {
  db.collection('users').doc(uid).collection('itemIndex')
    .add(item)
    .then((docRef) => {
      callback(docRef.id);
    })
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function setItem(item, itemId, uid) {
  db.collection('users').doc(uid).collection('itemIndex').doc(itemId)
    .set(item)
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}

export function deleteItem(itemId, uid) {
  // delete content if exist
  db.collection('users').doc(uid).collection('noteContent').doc(itemId)
    .delete()
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));

  db.collection('users').doc(uid).collection('projectContent').doc(itemId)
    .delete()
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));

  // delete index
  db.collection('users').doc(uid).collection('itemIndex').doc(itemId)
    .delete()
    .catch((err) => setAlertWithDispath(JSON.stringify(err)));
  return () => { };
}
