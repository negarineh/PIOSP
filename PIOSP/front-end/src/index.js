/*jshint esversion: 6 */ 
/*eslint no-undef: "error"*/
/*eslint-env node*/

// /*eslint no-undef-init: "error"*/
// /*eslint-env es6*/

/*eslint no-console: "off"*/ 
/* global Promise: true */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';

import { store } from './_helpers';
import { App } from './App';
import  ErrorBoundry  from './ErrorBoundry/ErrorBoundry';

// all components routed inside app component and rendering in a single html page 
// all wrapping in store for using in redux 
const app = document.getElementById('root');

ReactDOM.render((

    <Provider store={store}>
        <ErrorBoundry>
            <App />
        </ErrorBoundry>
    </Provider>
),  app);

registerServiceWorker();
