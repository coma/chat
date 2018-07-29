import { INDICATE_TYPING, indicateTyping } from '../actions';
import empty from './empty';

export default socket => () => next => action => {
  if (action.type !== INDICATE_TYPING || action.payload.isTheOther) {
    return next(action);
  }

  socket.emit('action', indicateTyping(action.payload.isTyping, true));
  return next(empty());
};
