import {
  compose, createStore, combineReducers, applyMiddleware
}
  from 'redux';
import thunk from 'redux-thunk';
import { firebaseReducer, reactReduxFirebase } from 'react-redux-firebase';
import firebase from 'firebase';

import counterReducer from './services/counter/reducer';
import authReducer from './services/auth/reducer';
import firebaseConfig from '../secrets/firebaseConfig';

const reducers = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  firebase: firebaseReducer
});

firebase.initializeApp(firebaseConfig);

// react-redux-firebase options
const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
};

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore);


// const store = createStore(reducers, applyMiddleware(thunk));
const store = createStoreWithFirebase(reducers, applyMiddleware(thunk));

export default store;
