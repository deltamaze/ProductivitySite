const settingReducer = (state = { settingsData: 'Loading' }, action) => {
    switch (action.type) {
        case 'SETTINGS':
            return {
                settingsData: action.payload.settingsData,
            };
        default:
            return state;
    }
};

export default settingReducer;
