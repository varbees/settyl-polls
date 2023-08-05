import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PollItem = ({ poll: { _id, question, isActive, slug } }) => {
  return (
    <div
      key={_id}
      className='card rounded-xl   w-auto bg-neutral text-neutral-content'
    >
      <div className='card-body flex flex-col pb-3'>
        <h3 className='card-title mb-4 text-lg font-semibold flex-grow'>
          {question}
        </h3>
        <hr />
        <div className='card-actions flex-shrink justify-center px-0'>
          {isActive ? (
            <Link
              to={slug ? `/polls/${slug}` : `/polls/${_id}`}
              className=' btn w-full btn-primary rounded-xl  border normal-case hover:text-success  font-semibold hover:bg-white hover:border-success hover:shadow-xl'
            >
              Vote
            </Link>
          ) : (
            <p className=' btn w-full btn-secondary rounded-xl  border normal-case hover:text-error  font-semibold hover:bg-white hover:border-error hover:shadow-xl'>
              Voting Closed
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PollItem;

PollItem.propTypes = {
  poll: PropTypes.object.isRequired,
};
