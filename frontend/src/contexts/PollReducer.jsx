const PollReducer = (state, action) => {
  switch (action.type) {
    case 'GET_POLLS':
      return {
        ...state,
        polls: action.payload,
        isLoading: false,
      };

    case 'GET_POLL':
      return {
        ...state,
        poll: action.payload,
        isLoading: false,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'HAS_VOTED':
      return {
        ...state,
        hasVoted: action.payload,
      };
    default:
      return state;
  }
};

export default PollReducer;
