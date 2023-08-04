import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title }) => {
  return (
    <nav className='navbar mb-8  shadow-lg  bg-neutral text-neutral-content'>
      <div className='container max-auto'>
        <div className='flex-none px-2 mx-2 hover:text-accent'>
          <Link to='/' className='text-3xl font-bold'>
            {title}
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2'>
          <div className='flex justify-end '>
            <Link
              to='/'
              className='py-2 btn btn-sm btn-secondary border rounded-btn normal-case hover:text-success hover:bg-white hover:border-success mr-2'
            >
              Polls
            </Link>
            <Link
              to='/about'
              className='py-2 btn btn-sm btn-secondary border rounded-btn normal-case hover:text-success hover:bg-white hover:border-success'
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'SettylPolls',
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;
