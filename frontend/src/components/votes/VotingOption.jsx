import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socket from '../../utils/socket';
import Spinner from '../layout/Spinner';

const VotingOption = ({ poll, option, handleVote, hasVoted, checkVote }) => {
  const percentage = (option.votes / poll.totalVotes) * 100;

  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function updatedVotingData() {
      console.log('Received voting update:', updatedVotingData);
    }

    socket.on('connect', onConnect);
    socket.on('votingUpdate', updatedVotingData);
    socket.on('disconnect', onDisconnect);

    const fetchData = async () => {
      setLoading(true);
      await checkVote(poll._id);
      setLoading(false);
    };
    fetchData();
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('votingUpdate', updatedVotingData);
    };
  }, [poll._id]);

  return loading ? (
    <Spinner />
  ) : (
    <div className='card-content p-3' key={option._id}>
      <div
        className='btn btn-wide btn-secondary rounded-xl normal-case hover:text-accent-content hover:btn-accent'
        onClick={() => handleVote(option.optionText)}
      >
        <div className='flex justify-around align-middle'>
          {hasVoted && <p className='mb-2'>{Math.round(percentage)}% say:</p>}
          <p className=''> {`${option.optionText}`}</p>
        </div>

        {hasVoted && (
          <div>
            <progress
              className='progress progress-accent w-56 '
              value={percentage}
              max='100'
            ></progress>
          </div>
        )}
      </div>
    </div>
  );
};

VotingOption.propTypes = {
  poll: PropTypes.object.isRequired,
  option: PropTypes.object.isRequired,
  votedOption: PropTypes.string,
  handleVote: PropTypes.func.isRequired,
  hasVoted: PropTypes.bool.isRequired,
  checkVote: PropTypes.func.isRequired,
};

export default VotingOption;
