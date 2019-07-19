
import firebase from '../firebase/firebase';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// ACTION GENERATORS
export function fetchAuth() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: LOGIN,
          payload: { username: user.uid, userToken: user.uid, userRole: 'admin' }
        });
      } else {
        dispatch({
          type: LOGOUT
        });
      }
    });
  };
}

export function login() {
  return () => firebase.auth().signInAnonymously();
}

export function logout() {
  return () => firebase.auth().signOut();
}
