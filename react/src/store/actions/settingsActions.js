import { setAlertWithDispatch } from './alertActions';
import { db } from '../../config/firebaseInitializer';

export const SETTINGS = 'SETTINGS';

let settingsRef;
let settingsListener;

export function fetchSettings(uid) {
    return (dispatch) => {
        if (settingsListener != undefined) {
            settingsListener(); // Remove previous listener
            dispatch({
                type: SETTINGS,
                payload: { settingsData: 'Loading' }
            });
        }
        try {
            settingsRef = db.collection('users')
                .doc(uid)
                .collection('settings')
                .doc('display');
            settingsListener = settingsRef
                .onSnapshot((doc) => {
                    if (doc.data() === undefined) {
                        dispatch({
                            type: SETTINGS,
                            payload: {
                                settingsData: {
                                    theme: 'Light',
                                    colorOne: '#0026AD',
                                    colorTwo: '#4B0066'
                                }
                            } // settings collection not set
                        });
                    } else { // cal item set, push to state
                        dispatch({
                            type: SETTINGS,
                            payload: { settingsData: doc.data() }
                        });
                    }
                });
        } catch (err) {
            setAlertWithDispatch(JSON.stringify(err));
        }
    };
}

export function setSettings(settingData, uid) {
    db.collection('users').doc(uid).collection('settings').doc('display')
        .set(settingData)
        .catch((err) => setAlertWithDispatch(JSON.stringify(err)));
    return () => { };
}
