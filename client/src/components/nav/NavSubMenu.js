import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NavSubMenu = ({ children, name }) => {
  const items = children.map((link, index) => <li key={index}>{link}</li>);

  return (
    <Fragment>
      <a aria-haspopup="menu">
        {name}
      </a>
      <ul>
        {items}
      </ul>
    </Fragment>
  );
};

NavSubMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  name: PropTypes.string.isRequired,
};

export default NavSubMenu;
