import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './services/auth/reducer';
import monthReducer from './services/monthsEntity/reducer';
import alertReducer from './services/alerts/reducer';
import selectedDateReducer from './services/selectedDate/reducer';
import itemIndexReducer from './services/itemIndexEntity/reducer';
import noteReducer from './services/noteEntity/reducer';
import eventReducer from './services/eventsEntity/reducer';
import recurringReducer from './services/recurringEntity/reducer';

const reducers = combineReducers({
  auth: authReducer,
  month: monthReducer,
  alert: alertReducer,
  selectedDate: selectedDateReducer,
  itemIndex: itemIndexReducer,
  note: noteReducer,
  events: eventReducer,
  recurringEvents: recurringReducer

});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
