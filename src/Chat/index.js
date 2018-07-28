import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Messages from './Messages';
import Sender from './Sender';
import style from './style.module.css';

const Chat = () => (
  <Provider store={store}>
    <div className={style.chat}>
      <Messages />
      <Sender />
    </div>
  </Provider>
);

export default Chat;
