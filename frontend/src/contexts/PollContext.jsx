import { createContext, useReducer } from 'react';
import PollReducer from './PollReducer';
import Cookies from 'js-cookie';
import { getPolls, getPoll, votePoll } from './PollActions';

const PollContext = createContext();

// eslint-disable-next-line react/prop-types
export const PollProvider = ({ children }) => {
  const initialState = {
    polls: [],
    poll: {},
    votes: [],
    isLoading: false,
    hasVoted: false,
  };

  const [state, dispatch] = useReducer(PollReducer, initialState);
  const userId = Cookies.get('userId');

  const getAllPolls = async () => {
    dispatch({ type: 'SET_LOADING' });
    const pollsData = await getPolls();
    dispatch({ type: 'GET_POLLS', payload: pollsData });
  };

  const getPollById = async id => {
    dispatch({ type: 'SET_LOADING' });
    const pollData = await getPoll(id);
    dispatch({ type: 'GET_POLL', payload: pollData });
  };

  const voteById = async (id, votedOption) => {
    const pollStatus = await votePoll(id, votedOption);
    checkVote(id);
    return pollStatus;
  };

  const checkVote = async id => {
    const pollData = await getPoll(id);
    const existingVote = pollData.votes.find(vote => vote.userId === userId);
    dispatch({ type: 'HAS_VOTED', payload: !!existingVote });
  };

  return (
    <PollContext.Provider
      value={{
        ...state,
        getAllPolls,
        getPollById,
        voteById,
        checkVote,
        dispatch,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export default PollContext;
