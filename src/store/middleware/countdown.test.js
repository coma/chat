import { startCountdown, stepCountdown } from '../actions';
import empty from './empty';
import middleware from './countdown';

describe('the countdown middleware', () => {
  it('should only act for START_COUNTDOWN actions', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const action = { type: Symbol('some random type') };

    expect(middleware()(next)(action)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should step every second and finally redirect', () => {
    jest.useFakeTimers();
    window.location.assign = jest.fn();

    const store = { dispatch: jest.fn() };
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const url = 'https://comakai.com';
    const startAction = startCountdown(3, url);

    expect(middleware(store)(next)(startAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
    expect(store.dispatch).toHaveBeenCalledWith(stepCountdown(3));
    expect(clearTimeout).toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(store.dispatch).toHaveBeenLastCalledWith(stepCountdown(2));
    expect(window.location.assign).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(store.dispatch).toHaveBeenLastCalledWith(stepCountdown(1));
    expect(window.location.assign).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    expect(store.dispatch).toHaveBeenLastCalledWith(stepCountdown(1));
    expect(window.location.assign).toHaveBeenCalledWith(url);
  });
});