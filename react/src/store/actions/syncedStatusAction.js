export const SYNCED = 'SYNCED';
export const NOTSYNCED = 'NOTSYNCED';

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
