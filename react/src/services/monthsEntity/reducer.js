const monthReducer = (state = { monthData: undefined, monthRef: 0 }, action) => {
  switch (action.type) {
  case 'FETCHMONTH':
    return {
      monthData: action.payload.monthData,
      monthRef: action.payload.monthRef,
    };
  default:
    return state;
  }
};

export default monthReducer;
