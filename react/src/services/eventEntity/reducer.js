const eventReducer = (
  state = {
    eventData: 'Loading', // pulled from Firestore
    // below is used to modify existing items/create new items
    upsertModalShow: false,
    deleteModalShow: false,
    targetEventId: '0',
    title: 'EventTitle',
    description: '',
    frequency: 1,
    frequencyType: 'Daily', // week,month,just once
    weekPartSelection: [], // 0 = sunday, 3 = wednesday
    startDate: Date.now(),
    endDate: undefined,
    monthTypeSelection: 'dayNumber', // 'nthDay'
    monthPartSelection: []// 0 = jan, 4=May, would look like [0,4,etc...]

  }, action
) => {
  // deep copy

  const newState = {

    eventData: state.eventData,
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
  case 'SETEVENT':
    newState.eventData = action.payload.eventData;
    return newState;

  case 'EVENTUPSERTMODALSHOW':
    newState.upsertModalShow = action.payload.isHidden;
    return newState;

  case 'EVENTDELETEMODALSHOW':
    newState.deleteModalShow = action.payload.isHidden;
    return newState;

  case 'EVENTSETTITLE':
    newState.title = action.payload.newVal;
    return newState;

  case 'EVENTSETDESCRIPTION':
    newState.description = action.payload.newVal;
    return newState;

  case 'EVENTSETFREQUENCY':
    newState.frequency = action.payload.newVal;
    return newState;
  case 'EVENTSETFREQUENCYTYPE':
    newState.frequencyType = action.payload.newVal;
    return newState;
  case 'EVENTSETWEEKPARTSELECTION':
    newState.weekPartSelection = action.payload.newVal;
    return newState;
  case 'EVENTSETSTARTDATE':
    newState.startDate = action.payload.newVal;
    return newState;
  case 'EVENTSETENDDATE':
    newState.endDate = action.payload.newVal;
    return newState;
  case 'EVENTSETMONTHTYPESELECTION':
    newState.monthTypeSelection = action.payload.newVal;
    return newState;
  case 'EVENTSETMONTHPARTSELECTION':
    newState.monthPartSelection = action.payload.newVal;
    return newState;
  default:
    return state;
  }
};

export default eventReducer;