const authReducer = (state = { username: '', uid: '' }, action) => {
  switch (action.type) {
  case 'UPSERTUSERINFO':
    return {
      username: action.payload.username,
      uid: action.payload.uid
    };
  // case 'SETUSERNAME':
  //   return {
  //     username: action.payload.username,
  //     uid: state.uid
  //   };
  // case 'LOGOUT':
  //   return { username: '', uid: '' };
  default:
    return state;
  }
};

export default authReducer;
