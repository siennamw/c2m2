import React from 'react';

const FooterAttribution = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div id="footer-attribution">
      Copyright &copy;
      {` ${year} `}
      <a
        href="http://www.michaelwharris.net/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Michael W. Harris
      </a>
      {' and '}
      <a
        href="http://www.siennamwood.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sienna M. Wood
      </a>
    </div>
  );
};

export default FooterAttribution;
