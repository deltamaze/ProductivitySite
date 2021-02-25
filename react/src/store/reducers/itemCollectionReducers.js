const itemIndexReducer = (state = { items: 'Loading' }, action) => {
    switch (action.type) {
        case 'SETITEMINDEX':
            return {
                items: action.payload.items,
            };
        default:
            return state;
    }
};

export default itemIndexReducer;
