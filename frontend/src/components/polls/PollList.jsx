import { useContext, useEffect } from 'react';
import PollContext from '../../contexts/PollContext';
import PollItem from './PollItem';
import Spinner from '../layout/Spinner';

const PollList = () => {
  const { polls, isLoading, getAllPolls } = useContext(PollContext);

  useEffect(() => {
    getAllPolls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2'>
      {polls
        ? polls.map(poll => <PollItem key={poll._id} poll={poll} />)
        : null}
    </div>
  );
};

export default PollList;
