import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GrLinkPrevious } from 'react-icons/gr';
import PollContext from '../contexts/PollContext';
import VotingOption from '../components/votes/VotingOption';
import Spinner from '../components/layout/Spinner';
import { toast } from 'react-toastify';

const Poll = () => {
  const [votedOption, setVotedOption] = useState(null);
  const { id } = useParams();
  const { poll, isLoading, getPollById, voteById, hasVoted, checkVote } =
    useContext(PollContext);

  useEffect(() => {
    getPollById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleVote = async optionText => {
    try {
      const status = await voteById(poll._id, optionText);
      setVotedOption(optionText);
      toast.info(status.message);
    } catch (err) {
      toast.error('Looks like you already participated on this poll');
    }
  };

  return (
    <div>
      <div className='flex justify-start'>
        <Link
          to='/polls'
          className=' w-24 btn btn-content rounded-2xl hover:btn-outline hover:accent-stone-50 normal-case mb-8'
        >
          Go Back
        </Link>
      </div>
      <div className='flex justify-center items-center '>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className='card rounded-xl  w-auto bg-neutral text-neutral-content'>
            <div className='card-body flex flex-col pb-3'>
              <h2 className='card-title mb-4 text-2xl p-6 font-semibold flex-grow'>
                {poll.question}
              </h2>
              <div className='card-actions flex-shrink justify-center flex-col items-center'>
                {Object.keys(poll).length > 0 &&
                  poll.options.map(option => (
                    <VotingOption
                      key={option._id}
                      option={option}
                      votedOption={votedOption}
                      poll={poll}
                      handleVote={handleVote}
                      hasVoted={hasVoted}
                      checkVote={checkVote}
                    />
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Poll;
