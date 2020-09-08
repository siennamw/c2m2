import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const NavSubMenu = ({ children, name }) => {
  // index as key okay here because items are static
  // eslint-disable-next-line react/no-array-index-key
  const items = children.map((link, index) => <li key={index}>{link}</li>);

  return (
    <Fragment>
      <button aria-haspopup="menu" id={`${name}-label`} type="button">
        {name}
      </button>
      <ul aria-labelledby={`${name}-label`}>
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
