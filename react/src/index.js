import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PageRouter from './pages/router';
import store from './store';
import NavBar from './layouts/navbar';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <NavBar />
      <PageRouter />
    </BrowserRouter>
  </Provider>, document.querySelector('.container')
);
