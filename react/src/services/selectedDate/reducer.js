const selectedDateReducer = (state = { date: Date.now() }, action) => {
  switch (action.type) {
  case 'SETDATE':
    return {
      date: action.payload.date
    };
  default:
    return state;
  }
};

export default selectedDateReducer;
