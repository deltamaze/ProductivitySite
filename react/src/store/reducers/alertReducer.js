const alertReducer = (state = { alertMsg: 'init', dismissed: true }, action) => {
    switch (action.type) {
        case 'NEWALERT':
            return {
                alertMsg: action.payload.alertMsg,
                dismissed: false
            };
        case 'DISMISS':
            return { alertMsg: state.alertMsg, dismissed: true };
        default:
            return state;
    }
};

export default alertReducer;
