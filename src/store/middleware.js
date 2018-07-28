import uuid from 'uuid/v4';
import { SEND, addMessage, setNick, removeMessage } from './actions';

export const empty = { type: '' };
const commandRegex = /^\/([a-z]+) *(.*)?$/;
const NICK_COMMAND = 'nick';
const THINK_COMMAND = 'think';
const OOPS_COMMAND = 'oops';

export default socket => store => next => action => {
  if (action.type !== SEND) {
    return next(action);
  }

  const { text } = action.payload;
  const match = commandRegex.exec(text);

  if (!match) {
    const action = addMessage(uuid(), text, true);
    socket.emit('action', action);
    return next(action);
  }

  const command = match[1];
  const content = match[2];

  switch (command) {
    case NICK_COMMAND: {
      const action = setNick(content);
      socket.emit('action', action);
      return next(empty);
    }

    case THINK_COMMAND: {
      const action = addMessage(uuid(), content, true, true);
      socket.emit('action', action);
      return next(action);
    }

    case OOPS_COMMAND: {
      const lastMessage = store.getState()
        .messages.reverse().find(message => message.isMine);

      if (!lastMessage) {
        return next(empty);
      }

      const action = removeMessage(lastMessage.id);
      socket.emit('action', action);
      return next(action);
    }

    default:
      return next(empty);
  }
};
