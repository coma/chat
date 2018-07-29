import { ADD_MESSAGE, REMOVE_MESSAGE, SET_NICK, INDICATE_TYPING } from './actions';

export default (state = { messages: [] }, { type, payload }) => {
  switch(type) {
    case ADD_MESSAGE: {
      const { messages } = state;
      return { ...state, messages: [...messages, payload] };
    }

    case REMOVE_MESSAGE: {
      const messages = state.messages.filter(message => message.id !== payload.id);
      return { ...state, messages };
    }

    case SET_NICK:
      return { ...state, other: payload.nick };

    case INDICATE_TYPING:
      return { ...state, isTyping: payload.isTyping };

    default:
      return state;
  }
};
