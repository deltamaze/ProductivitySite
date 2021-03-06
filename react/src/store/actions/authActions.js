import { setAlertWithDispatch } from './alertActions';
import firebase from '../../config/firebaseInitializer';

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
    const provider = new firebase.auth.GoogleAuthProvider();
    return () => firebase.auth().signInWithPopup(provider).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // ...
        setAlertWithDispatch(`Error logging in with Google Credentials: ErrorCode:${errorCode} ErrorMessage:${errorMessage}`);
    });
}

export function loginGuest() {
    return () => firebase.auth().signInAnonymously().catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // ...
        setAlertWithDispatch(`Error logging in with Anonymously: ErrorCode:${errorCode} ErrorMessage:${errorMessage}`);
    });
}
export function logout() {
    return () => firebase.auth().signOut();
}
