import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Messages from './Messages';
import style from './style.module.css';

const Chat = () => (
  <Provider store={store}>
    <div className={style.chat}>
      <Messages />
    </div>
  </Provider>
);

export default Chat;
