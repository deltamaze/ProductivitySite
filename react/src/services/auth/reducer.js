const authReducer = (state = { uid: 'Connecting' }, action) => {
  switch (action.type) {
  case 'UPSERTUSERINFO':
    return {
      uid: action.payload.uid
    };
  default:
    return state;
  }
};

export default authReducer;
