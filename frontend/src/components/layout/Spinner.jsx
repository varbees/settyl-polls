import { ImSpinner2 } from 'react-icons/im';

const Spinner = () => {
  return (
    <div className='flex justify-center items-centers w-100 mt-20 h-12'>
      {/* <ImSpinner2 /> */}
      <span className='loading loading-infinity loading-lg'></span>
    </div>
  );
};

export default Spinner;
