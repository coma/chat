import { compose, applyMiddleware, createStore } from 'redux';
import middleware from './middleware';
import reducer from './reducer';
import socket from './socket';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
const middlewares = applyMiddleware(middleware(socket));
const composed = compose(middlewares, devTools);
const create = composed(createStore);
const store = create(reducer);

export default store;
