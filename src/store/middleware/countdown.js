import { START_COUNTDOWN, stepCountdown } from '../actions';
import empty from './empty';

let last;

export default store => next => action => {
  if (action.type !== START_COUNTDOWN) {
    return next(action);
  }

  clearTimeout(last);
  let { seconds, url } = action.payload;

  const step = () => {
    if (seconds > 0) {
      store.dispatch(stepCountdown(seconds));
      last = setTimeout(step, 1000 * seconds);
      seconds--;
    } else {
      window.location.href = url;
    }
  };

  step();

  return next(empty());
};
