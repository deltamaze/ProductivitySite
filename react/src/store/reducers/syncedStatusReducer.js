const syncedStatusReducer = (state = { synced: true }, action) => {
    switch (action.type) {
        case 'SYNCED':
            return {
                synced: true
            };
        case 'NOTSYNCED':
            return { synced: false };
        default:
            return state;
    }
};

export default syncedStatusReducer;
