import store from '../store';

export const NEWALERT = 'NEWALERT';
export const DISMISS = 'DISMISS';

export function setAlert(alertMsg) {
    return (
        {
            type: NEWALERT,
            payload: { alertMsg }
        });
}

export function setAlertWithDispatch(alertMsg) {
    store.dispatch(
        setAlert(alertMsg)
    );
}

export function dismissAlert() {
    return (dispatch) => {
        dispatch({
            type: DISMISS
        });
    };
}
