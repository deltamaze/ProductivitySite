const recurringReducer = (
  state = {
    recurringEventData: 'Loading', // pulled from Firestore
    // below is used to modify existing items/create new items
    upsertModalShow: false,
    deleteModalShow: false,
    targetEventId: '0',
    title: 'EventTitle',
    description: '',
    frequency: 1,
    frequencyType: 'Daily', // week,month
    weekPartSelection: [], // 0 = sunday, 3 = wednesday
    startDate: Date.now(),
    endDate: undefined,
    monthTypeSelection: 'dayNumber', // 'nthDay'
    monthPartSelection: []// 0 = jan, 4=May, would look like [0,4,etc...]

  }, action
) => {
  // deep copy

  const newState = {

    recurringEventData: state.recurringEventData,
    upsertModalShow: state.upsertModalShow,
    deleteModalShow: state.deleteModalShow,
    targetEventId: state.targetEventId,
    title: state.title,
    description: state.description,
    frequency: state.frequency,
    frequencyType: state.frequencyType,
    weekPartSelection: state.weekPartSelection,
    startDate: state.startDate,
    endDate: state.endDate,
    monthPartSelection: state.monthPartSelection,

  };
  switch (action.type) {
  case 'SETRECURRINGEVENT':
    newState.recurringEventData = action.payload.recurringEventData;
    return newState;

  case 'RECURSEVENTUPSERTMODALSHOW':
    newState.upsertModalShow = action.payload.isHidden;
    return newState;

  case 'RECURSEVENTDELETEMODALSHOW':
    newState.deleteModalShow = action.payload.isHidden;
    return newState;
  default:
    return state;
  }
};

export default recurringReducer;
