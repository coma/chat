import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Nick from './Nick';
import Messages from './Messages';
import Sender from './Sender';
import Countdown from './Countdown';
import style from './style.module.css';

const Chat = () => (
  <Provider store={store}>
    <div className={style.chat}>
      <Nick />
      <Messages />
      <Sender />
      <Countdown />
    </div>
  </Provider>
);

export default Chat;
