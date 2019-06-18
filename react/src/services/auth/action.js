

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';


// ACTION GENERATORS

export const login = userPayload => ({
  // user provides un/pw
  // axios sends up with middle ware and gets back username/token, mock up token for now
  type: LOGIN,
  payload: { username: userPayload.username, userToken: 'werwa4ra', userRole: 'admin' }
});
export const logout = () => ({
  // user provides un/pw
  // axios sends up with middle ware and gets back username/token, mock up token for now
  type: LOGOUT
});
