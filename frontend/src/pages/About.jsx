import { FaGithub } from 'react-icons/fa';

const About = () => {
  return (
    <div className='p-6'>
      <h2 className='text-3xl font-bold mb-4'>About</h2>
      <p className='mb-4'>
        Welcome to Settyl Polls! Done as a task assigned by settyl and knowledge
        test. Polls - frontend built with React and a backend API built with
        Express and MongoDB.
      </p>
      <p className='mb-4'>
        The frontend allows users to view and vote on polls. It is responsible
        for displaying poll questions and options, handling user votes, and
        showing real-time updates using Socket.IO.
      </p>
      <p className='mb-4'>
        The backend API is responsible for handling poll data, user
        authentication, and vote updates. It uses MongoDB as the database and
        provides endpoints to create, read, update, and delete polls.
      </p>
      <p className='mb-4'>
        Feel free to check out the source code on GitHub and contribute to the
        project:
      </p>
      <a
        href='https://github.com/varbees/settyl-polls.git'
        target='_blank'
        rel='noopener noreferrer'
        className='btn btn-secondary hover:btn-accent inline-flex items-center'
      >
        <FaGithub className='mr-2 text-3xl' />
        GitHub Repository
      </a>
    </div>
  );
};

export default About;
