import { useEffect } from 'react';
import PollList from '../components/polls/PollList';
import { getPolls } from '../contexts/PollActions';

const Home = () => {
  return (
    <>
      <PollList />
    </>
  );
};

export default Home;
