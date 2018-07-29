import uuid from 'uuid/v4';
import { SEND, addMessage, setNick, removeMessage, fadeMessage } from '../actions';
import empty from './empty';

const commandRegex = /^\/([a-z]+) *(.*)?$/;
const NICK_COMMAND = 'nick';
const THINK_COMMAND = 'think';
const HIGHLIGHT_COMMAND = 'highlight';
const OOPS_COMMAND = 'oops';
const FADE_COMMAND = 'fadelast';

const trim = (text = '') => text.replace(/^ +/, '').replace(/ +$/, '');

export default socket => store => next => action => {
  if (action.type !== SEND) {
    return next(action);
  }

  const text = trim(action.payload.text);
  const match = commandRegex.exec(text);

  if (!match) {
    const id = uuid();
    socket.emit('action', addMessage(id, text, false));
    return next(addMessage(id, text, true));
  }

  const command = match[1];
  const content = trim(match[2]);

  switch (command) {
    case NICK_COMMAND: {
      const action = setNick(content);
      socket.emit('action', action);
      return next(empty());
    }

    case THINK_COMMAND: {
      if (!content) {
        return next(empty());
      }
      const id = uuid();
      socket.emit('action', addMessage(id, content, false, true));
      return next(addMessage(id, content, true, true));
    }

    case HIGHLIGHT_COMMAND: {
      if (!content) {
        return next(empty());
      }
      const id = uuid();
      socket.emit('action', addMessage(id, content, false, false, true));
      return next(addMessage(id, content, true, false, true));
    }

    case OOPS_COMMAND: {
      const lastMessage = store.getState()
        .messages.slice().reverse().find(message => message.isMine);

      if (!lastMessage) {
        return next(empty());
      }

      const action = removeMessage(lastMessage.id);
      socket.emit('action', action);
      return next(action);
    }

    case FADE_COMMAND: {
      const lastMessage = store.getState()
        .messages.slice().reverse().find(message => message.isMine);

      if (!lastMessage) {
        return next(empty());
      }

      const action = fadeMessage(lastMessage.id);
      socket.emit('action', action);
      return next(action);
    }

    default:
      return next(empty());
  }
};
