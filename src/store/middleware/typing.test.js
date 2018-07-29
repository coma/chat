import { indicateTyping } from '../actions';
import empty from './empty';
import middleware from './typing';

describe('the typing middleware', () => {
  it('should only act for INDICATE_TYPING actions', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const action = { type: Symbol('some random type') };

    expect(middleware()()(next)(action)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should send the current typing state', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const isTyping = true;
    const typingAction = indicateTyping(isTyping);
    const emitAction = indicateTyping(isTyping, true);

    expect(middleware(socket)()(next)(typingAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
    expect(socket.emit).toHaveBeenCalledWith('action', emitAction);
  });
});
