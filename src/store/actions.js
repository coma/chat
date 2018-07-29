export const SEND = 'SEND';
export const send = text => ({
  type: SEND,
  payload: { text },
});

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const addMessage = (id, text, isMine = true, isAThought = false) => ({
  type: ADD_MESSAGE,
  payload: { id, text, isMine, isAThought },
});

export const SET_NICK = 'SET_NICK';
export const setNick = (nick) => ({
  type: SET_NICK,
  payload: { nick },
});

export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const removeMessage = id => ({
  type: REMOVE_MESSAGE,
  payload: { id },
});

export const FADE_MESSAGE = 'FADE_MESSAGE';
export const fadeMessage = id => ({
  type: FADE_MESSAGE,
  payload: { id },
});

export const INDICATE_TYPING = 'INDICATE_TYPING';
export const indicateTyping = (isTyping, isTheOther = false) => ({
  type: INDICATE_TYPING,
  payload: { isTyping, isTheOther },
});
