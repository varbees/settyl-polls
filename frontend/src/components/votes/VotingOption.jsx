import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

const VotingOption = ({ poll, option, handleVote, hasVoted, checkVote }) => {
  const percentage = (option.votes / poll.totalVotes) * 100;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (poll?._id) {
        await checkVote(poll._id);
      }
      setLoading(false);
    };
    fetchData();
  }, [poll?._id]);

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
