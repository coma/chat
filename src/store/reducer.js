import { ADD_MESSAGE, REMOVE_MESSAGE, FADE_MESSAGE, SET_NICK, INDICATE_TYPING, STEP_COUNTDOWN } from './actions';

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

    case FADE_MESSAGE: {
      const { messages } = state;
      const index = messages.findIndex(message => message.id === payload.id);
      const message = { ...messages[index], isFaded: true };
      return { ...state, messages: [...messages.slice(0, index), message, ...messages.slice(index + 1)] };
    }

    case SET_NICK:
      return { ...state, other: payload.nick };

    case INDICATE_TYPING:
      return { ...state, isTyping: payload.isTyping };

    case STEP_COUNTDOWN:
      return { ...state, countdown: payload.seconds };

    default:
      return state;
  }
};
