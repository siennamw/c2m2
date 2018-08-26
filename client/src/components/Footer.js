import React from 'react';

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer>
      <p>
        Copyright &copy; {year} <a href="http://www.michaelwharris.net/"
           target="_blank"
           rel="noopener noreferrer"
        >
          Michael W. Harris
        </a> and <a href="http://www.siennamwood.com"
                    target="_blank"
                    rel="noopener noreferrer"
        >
          Sienna M. Wood
        </a>
      </p>
    </footer>
  )
};

export default Footer;
