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
  switch (action.type) {
  case 'SETRECURRINGEVENT':
    return {
      recurringEventData: action.payload.recurringEventData,
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
      monthPartSelection: [],
      specialStartCriteria: undefined
    };
    // add cases for updating targetRecurringEventOptions
  default:
    return state;
  }
};

export default recurringReducer;
