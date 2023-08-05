import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className='footer footer-center text-secondary-content p-10'>
      <div className='hover:text-accent'>
        <p>Copyright &copy; {year}</p> All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
