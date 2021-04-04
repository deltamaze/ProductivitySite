const syncedStatusReducer = (state = { synced: true, connected: true }, action) => {
    switch (action.type) {
        case 'SYNCED':
            return {
                synced: true, connected: state.connected
            };
        case 'NOTSYNCED':
            return { synced: false, connected: state.connected };
        case 'DBCONNECTED':
            return { synced: state.synced, connected: true };
        case 'DBNOTCONNECTED':
            return { synced: state.synced, connected: false };
        default:
            return state;
    }
};

export default syncedStatusReducer;
