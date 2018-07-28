import { SEND } from './actions';

export default socket => store => next => action => {
  if (action.type !== SEND) {
    return next(action);
  }
};
