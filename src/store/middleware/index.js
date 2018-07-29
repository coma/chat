import { applyMiddleware } from 'redux';
import socket from '../socket';
import commands from './commands';
import typing from './typing';
import countdown from './countdown';

export default applyMiddleware(
  commands(socket),
  typing(socket),
  countdown,
);
