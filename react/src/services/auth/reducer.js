const authReducer = (state = { username: '', userToken: '', userRole: '' }, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.payload;
  case 'LOGOUT':
    return { username: '', userToken: '', userRole: '' };
  default:
    return state;
  }
};

export default authReducer;
