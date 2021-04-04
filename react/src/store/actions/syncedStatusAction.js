import { setAlertWithDispatch } from './alertActions';
import { rtdb } from '../../config/firebaseInitializer';

export const SYNCED = 'SYNCED';
export const NOTSYNCED = 'NOTSYNCED';
export const DBCONNECTED = 'DBCONNECTED';
export const DBNOTCONNECTED = 'DBNOTCONNECTED';

export function setSyncedStatus() {
    return (dispatch) => {
        dispatch({
            type: SYNCED
        });
    };
}

export function setNotSyncedStatus() {
    return (dispatch) => {
        dispatch({
            type: NOTSYNCED
        });
    };
}

export function fetchConnectedStatus() {
    return (dispatch) => {
        try {
            // eslint-disable-next-line arrow-body-style
            rtdb.ref('.info/connected').on('value', (snap) => {
                if (snap.val()) {
                    dispatch({
                        type: DBCONNECTED
                    });
                } else {
                    dispatch({
                        type: DBNOTCONNECTED
                    });
                }
            });
        } catch (err) {
            setAlertWithDispatch(JSON.stringify(err));
        }
    };
}
