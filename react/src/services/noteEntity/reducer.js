const noteReducer = (state = { noteData: 'Loading' }, action) => {
  switch (action.type) {
  case 'SETNOTE':
    return {
      noteData: action.payload.noteData
    };
  default:
    return state;
  }
};

export default noteReducer;
