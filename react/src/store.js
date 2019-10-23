import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './services/auth/reducer';
import monthReducer from './services/monthsEntity/reducer';
import alertReducer from './services/alerts/reducer';
import selectedDateReducer from './services/selectedDate/reducer';
import itemIndexReducer from './services/itemIndexEntity/reducer';

const reducers = combineReducers({
  auth: authReducer,
  month: monthReducer,
  alert: alertReducer,
  selectedDate: selectedDateReducer,
  itemIndex: itemIndexReducer

});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
