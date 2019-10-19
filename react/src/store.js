import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './services/auth/reducer';
import monthReducer from './services/months/reducer';
import alertReducer from './services/alerts/reducer';
import targetDateReducer from './services/targetDate/reducer';

const reducers = combineReducers({
  auth: authReducer,
  month: monthReducer,
  alert: alertReducer,
  targetDate: targetDateReducer

});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
