import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import socket from '../../utils/socket';

const VotingOption = ({ poll, option, handleVote, hasVoted, checkVote }) => {
  const percentage = (option.votes / poll.totalVotes) * 100;

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
      await checkVote(poll._id);
    };
    fetchData();
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('votingUpdate', updatedVotingData);
    };

    return () => socket.off('votingUpdate');
  }, [hasVoted]);

  return (
    <div
      key={option._id}
      className='btn btn-wide btn-secondary rounded-xl normal-case hover:text-accent-content hover:btn-accent'
      onClick={() => handleVote(option.optionText)}
    >
      <div className=''>{option.optionText}</div>
      {hasVoted && (
        <progress
          className='progress progress-accent w-56 mt-2'
          value={percentage}
          max='100'
        >
          kk
        </progress>
      )}
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
