/* eslint-disable no-console */

import firebase from '../firebase/firebase';

export const UPSERTUSERINFO = 'UPSERTUSERINFO';

export function fetchAuth() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: UPSERTUSERINFO,
          payload: { uid: user.uid }
        });
      } else {
        // let state know that not logged in
        dispatch({
          type: UPSERTUSERINFO,
          payload: { uid: 'NotLoggedIn' }
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
