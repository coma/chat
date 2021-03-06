import { compose, createStore } from 'redux';
import middleware from './middleware';
import reducer from './reducer';
import socket from './socket';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
const composed = compose(middleware, devTools);
const create = composed(createStore);
const store = create(reducer);

socket.on('action', store.dispatch);

export default store;
