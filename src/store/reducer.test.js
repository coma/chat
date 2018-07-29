import { addMessage, removeMessage, fadeMessage, setNick, indicateTyping } from './actions';
import reducer from './reducer';

describe('the reducer', () => {
  it('should add messages', () => {
    const other = { id: 'other' };
    const state = { messages: [other] };
    const id = '123abc';
    const text = 'hello there!';
    const isMine = false;
    const isAThought = true;
    const action = addMessage(id, text, isMine, isAThought);
    const current = { id, text, isMine, isAThought };

    expect(reducer(state, action)).toEqual({ messages: [other, current] });
  });

  it('should remove messages', () => {
    const a = { id: 'a' };
    const b = { id: 'b' };
    const c = { id: 'c' };
    const state = { messages: [a, b, c] };
    const action = removeMessage('b');

    expect(reducer(state, action)).toEqual({ messages: [a, c] });
  });

  it('should fade messages', () => {
    const a = { id: 'a' };
    const b = { id: 'b' };
    const c = { id: 'c' };
    const state = { messages: [a, b, c] };
    const action = fadeMessage('b');

    expect(reducer(state, action)).toEqual({ messages: [a, { id: 'b', isFaded: true }, c] });
  });

  it('should set the other person\'s nick', () => {
    const action = setNick('coma');

    expect(reducer(undefined, action)).toEqual({ messages: [], other: 'coma' });
  });

  it('should indicate if the other is typing', () => {
    const action = indicateTyping(true);

    expect(reducer(undefined, action)).toEqual({ messages: [], isTyping: true });
  });
});