import { GiIsland, GiHabitatDome } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='text-center'>
      <GiIsland className='text-9xl mx-auto mb-5 text-orange-600 ' />
      <h1 className='text-6xl text-accent align-middle mb-8'>
        Welcome to <strong className='text-orange-500'>NOWHERE</strong> Land
      </h1>
      <Link
        to='/'
        className='btn btn-lg btn-wide btn-secondary border rounded-btn  hover:text-white hover:bg-neutral hover:border-success'
      >
        <GiHabitatDome className='mr-2 text-3xl motion-safe:animate-pulse' /> Go
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
