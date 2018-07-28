import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import style from './style.module.css';

export default () => (
  <Provider store={store}>
    <div className={style.chat}>hola</div>
  </Provider>
);
