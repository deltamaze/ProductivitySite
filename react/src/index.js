import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PageRouter from './components/router';
import store from './store';
import NavBar from './components/navbar';
import FirebaseServiceStarter from './components/firebaseServiceStarter';
import AlertBanner from './components/alert';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AlertBanner>
        <FirebaseServiceStarter />
        <NavBar />
        <PageRouter />
      </AlertBanner>
    </BrowserRouter>
  </Provider>, document.querySelector('.container')
);
