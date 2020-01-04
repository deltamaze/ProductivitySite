const recurringReducer = (
  state = {
    recurringEventData: 'Loading', // pulled from Firestore
    // below is used to modify existing items/create new items
    upsertModalShow: false,
    deleteModalShow: false,
    targetEventId: '0',
    title: '',
    description: '',
    frequency: 1,
    frequencyType: 'day',
    weekPartSelection: [],
    specifyTime: false,
    startDate: Date.now(),
    endDate: undefined,
    monthPartSelection: [],
    specialStartCriteria: undefined
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
    frequencyType: state.frequency,
    weekPartSelection: state.weekPartSelection,
    specifyTime: state.specifyTime,
    startDate: state.startDate,
    endDate: state.endDate,
    monthPartSelection: state.monthPartSelection,
    specialStartCriteria: state.specialStartCriteria
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
