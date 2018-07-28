import { ADD_MESSAGE, REMOVE_MESSAGE, SET_NICK } from './actions';

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

    default:
      return state;
  }
};
