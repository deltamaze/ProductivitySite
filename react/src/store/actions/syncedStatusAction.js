import { setAlertWithDispatch } from './alertActions';
import { rtdb } from '../../config/firebaseInitializer';

export const SYNCED = 'SYNCED';
export const NOTSYNCED = 'NOTSYNCED';
export const CONNECTED = 'CONNECTED';
export const NOTCONNECTED = 'NOTCONNECTED';

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

export function setConnectedStatus() {
    try {
        // eslint-disable-next-line arrow-body-style
        rtdb.ref('.info/connected').on('value', (snap) => {
            return (dispatch) => {
                if (snap.val()) {
                    dispatch({
                        type: CONNECTED
                    });
                } else {
                    dispatch({
                        type: NOTCONNECTED
                    });
                }
            };
        });
    } catch (err) {
        setAlertWithDispatch(JSON.stringify(err));
    }
}
