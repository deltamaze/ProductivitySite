const monthReducer = (state = { settingsData: 'Loading', monthRef: 0 }, action) => {
    switch (action.type) {
        case 'SETTINGS':
            return {
                monthData: action.payload.monthData,
                monthRef: action.payload.monthRef,
            };
        default:
            return state;
    }
};

export default monthReducer;
