const monthReducer = (state = { monthData: undefined, monthRef: 0 }, action) => {
  switch (action.type) {
  case 'FETCHMONTH':
    return {
      month: action.payload.month,
      monthRef: action.payload.monthRef,
    };
  default:
    return state;
  }
};

export default monthReducer;
