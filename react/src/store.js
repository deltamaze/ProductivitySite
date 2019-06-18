import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import counterReducer from './services/counter/reducer';
import authReducer from './services/auth/reducer';

const reducers = combineReducers({
  counter: counterReducer,
  auth: authReducer

});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
