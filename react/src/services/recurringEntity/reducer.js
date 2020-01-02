const recurringReducer = (
  state = {
    recurringEventData: 'Loading',
    targetRecurEventId: '0',
    title: '',
    description: '',
    frequency: 1,
    frequencyType: 'day',
    weekPartSelection: [],
    specifyTime: false,
    startDate: Date.now(),
    endDate: undefined,
    targetRecurEventTitle: '',
    // yearlyTargetMonth: getMonthName(new Date.now()),
    specialStartCriteria: undefined
  }, action
) => {
  switch (action.type) {
  case 'SETRECURRINGEVENT':
    return {
      noteData: action.payload.noteData
    };
    // add cases for updating targetRecurringEventOptions
  default:
    return state;
  }
};

export default recurringReducer;
