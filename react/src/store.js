import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './services/counter/reducer';
import authReducer from './services/auth/reducer';
import alertReducer from './services/alerts/reducer';

const reducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  alert: alertReducer

});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
