import uuid from 'uuid/v4';
import { send, addMessage, setNick, removeMessage, fadeMessage, startCountdown } from '../actions';
import empty from './empty';
import middleware from './commands';

describe('the commands middleware', () => {
  it('should only act for SEND actions', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const action = { type: Symbol('some random type') };

    expect(middleware()()(next)(action)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should only act for content commands when there is content', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);

    expect(middleware()()(next)(send('/think'))).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());

    expect(middleware()()(next)(send('/highlight    '))).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
  });

  it('should add the text as message for regular text', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const id = uuid();
    const text = 'some text...';
    const sendAction = send(`  ${text}   `);
    const addAction = addMessage(id, text, true);
    const emitAction = addMessage(id, text, false);

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(addAction);
    expect(socket.emit).toHaveBeenCalledWith('action', emitAction);
  });

  it('should do nothing for unknown commands', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const sendAction = send('/foo 123');

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
    expect(socket.emit).not.toHaveBeenCalled();
  });

  it('should send the nick command', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const sendAction = send('/nick coma');
    const nickAction = setNick('coma');

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
    expect(socket.emit).toHaveBeenCalledWith('action', nickAction);
  });

  it('should send the think command', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const id = uuid();
    const text = 'wow';
    const sendAction = send('/think wow');
    const thinkAction = addMessage(id, text, true, true);
    const emitAction = addMessage(id, text, false, true);

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(thinkAction);
    expect(socket.emit).toHaveBeenCalledWith('action', emitAction);
  });

  it('should send the highlight command', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const id = uuid();
    const text = 'wow';
    const sendAction = send('/highlight wow');
    const highlightAction = addMessage(id, text, true, false, true);
    const emitAction = addMessage(id, text, false, false, true);

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(highlightAction);
    expect(socket.emit).toHaveBeenCalledWith('action', emitAction);
  });

  it('should send the oops command', () => {
    const state = {
      messages: [
        { id: '123abc', isMine: true },
        { id: '456def', isMine: true },
        { id: '789ghi', isMine: false },
      ]
    };

    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const store = { getState: jest.fn(() => state) };
    const sendAction = send('/oops');
    const oopsAction = removeMessage('456def');

    expect(middleware(socket)(store)(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(oopsAction);
    expect(socket.emit).toHaveBeenCalledWith('action', oopsAction);
  });

  it('should not send the oops command if there are no messages to remove', () => {
    const state = { messages: [] };
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const store = { getState: jest.fn(() => state) };
    const sendAction = send('/oops');

    expect(middleware(socket)(store)(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
    expect(socket.emit).not.toHaveBeenCalled();
  });

  it('should fade the last message', () => {
    const state = {
      messages: [
        { id: '123abc', isMine: true },
        { id: '456def', isMine: true },
        { id: '789ghi', isMine: false },
      ]
    };

    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const store = { getState: jest.fn(() => state) };
    const sendAction = send('/fadelast');
    const fadeAction = fadeMessage('456def');

    expect(middleware(socket)(store)(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(fadeAction);
    expect(socket.emit).toHaveBeenCalledWith('action', fadeAction);
  });

  it('should send the countdown command', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const sendAction = send('/countdown 5 https://comakai.com');
    const countdownAction = startCountdown(5, 'https://comakai.com');

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
    expect(socket.emit).toHaveBeenCalledWith('action', countdownAction);
  });

  it('should not send the countdown command if is not properly written', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const sendAction = send('/countdown 5.3 https://comakai.com');

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty());
    expect(socket.emit).not.toHaveBeenCalled();
  });
});
