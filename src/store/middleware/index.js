import { applyMiddleware } from 'redux';
import socket from '../socket';
import commands from './commands';
import typing from './typing';

export default applyMiddleware(
  commands(socket),
  typing(socket),
);
