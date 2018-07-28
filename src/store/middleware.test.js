import uuid from 'uuid/v4';
import { send, addMessage, setNick, removeMessage } from './actions';
import middleware, { empty } from './middleware';

describe('the middleware', () => {
  it('should only act for SEND actions', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const action = { type: Symbol('some random type') };

    expect(middleware()()(next)(action)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('should add the text as message for regular text', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const id = uuid();
    const text = 'some text...';
    const sendAction = send(text);
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
    expect(next).toHaveBeenCalledWith(empty);
    expect(socket.emit).not.toHaveBeenCalled();
  });

  it('should send the nick command', () => {
    const nextState = Symbol('the next state...');
    const next = jest.fn(() => nextState);
    const socket = { emit: jest.fn() };
    const sendAction = send('/nick coma');
    const nickAction = setNick('coma');

    expect(middleware(socket)()(next)(sendAction)).toBe(nextState);
    expect(next).toHaveBeenCalledWith(empty);
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
    expect(next).toHaveBeenCalledWith(empty);
    expect(socket.emit).not.toHaveBeenCalled();
  });
});
