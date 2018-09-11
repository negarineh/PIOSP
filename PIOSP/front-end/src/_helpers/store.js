import { createStore, applyMiddleware, compose  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../_reducers';

import reduxCatch from 'redux-catch';//

const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//added for redux error handling
function errorHandler(error, getState, lastAction, dispatch) {
  console.error(error); // eslint-disable-line no-console
  console.debug('current state', getState()); // eslint-disable-line no-console
  console.debug('last action was', lastAction); // eslint-disable-line no-console
  // optionally dispatch an action due to the error using the dispatch parameter
}

export const store = createStore(
    rootReducer, composeEnhancers(
    applyMiddleware(
        thunkMiddleware,//it should be first in list to work
        loggerMiddleware,
        reduxCatch(errorHandler) //added for redux error handling
    ))
);