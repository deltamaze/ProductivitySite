const eventReducer = (state = { eventData: 'Loading' }, action) => {
  switch (action.type) {
  case 'SETEVENTS':
    return {
      eventData: action.payload.eventData,
    };
  default:
    return state;
  }
};

export default eventReducer;
