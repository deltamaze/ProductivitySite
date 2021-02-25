import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PageRouter from './components/routing/router';
import store from './store/store';
import NavBar from './components/layout/navbar';
import SideBar from './components/layout/sidebar';
import FirebaseServiceStarter from './components/services/firebaseServiceStarter';
import AlertBanner from './components/alert/alertBanner';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <FirebaseServiceStarter />
            <SideBar />
            <div className="main">
                <NavBar />
                <AlertBanner>
                    <PageRouter />
                </AlertBanner>
            </div>
        </BrowserRouter>
    </Provider>, document.querySelector('.appContainer')
);
