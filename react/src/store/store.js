import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './reducers/authReducer';
import monthReducer from './reducers/monthCollectionReducer';
import settingsReducer from './reducers/settingsCollectionReducer';
import alertReducer from './reducers/alertReducer';
import selectedDateReducer from './reducers/dateSelectReducer';
import itemIndexReducer from './reducers/itemCollectionReducers';
import noteReducer from './reducers/noteCollectionReducer';
import eventReducer from './reducers/eventCollectionReducer';

const reducers = combineReducers({
    auth: authReducer,
    month: monthReducer,
    settings: settingsReducer,
    alert: alertReducer,
    selectedDate: selectedDateReducer,
    itemIndex: itemIndexReducer,
    note: noteReducer,
    events: eventReducer

});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
