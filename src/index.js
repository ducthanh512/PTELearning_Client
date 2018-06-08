import React from 'react';
import ReactDOM from 'react-dom';
import PTEPractice from './components/App/PTEPractice';
import {createStore,applyMiddleware} from 'redux'
import appReducers from './reducers/index';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';

import'./../public/css/bootstrap.min.css';
import'./../public/css/mdb.min.css';
import'./../public/css/style.css';

import'./../public/js/jquery-3.3.1.min.js';
import'./../public/js/popper.min.js';
import'./../public/js/bootstrap.min.js';
import'./../public/js/mdb.min.js';
import'./../public/js/script.js';

const store = createStore(
    appReducers,
    applyMiddleware(thunk),
)


ReactDOM.render(
<Provider store = {store}>
    <PTEPractice />
    </Provider>, document.getElementById('root'));

