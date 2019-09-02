import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Nav = ({ ariaLabel, children }) => {
  const [narrowNavShown, setNarrowNavShown] = useState(false);

  const hideNarrowMenu = () => {
    setNarrowNavShown(false);
  };

  const showNarrowMenu = () => {
    setNarrowNavShown(true);
  };

  const items = children.map((item, index) => <li key={index}>{item}</li>);

  return (
    <nav aria-label={ariaLabel}>
      <button
        aria-expanded={narrowNavShown}
        className="nav-toggle button-primary u-full-width"
        onClick={narrowNavShown ? hideNarrowMenu : showNarrowMenu}
        type="button"
      >
        Show/Hide Menu
      </button>
      <ul
        className={narrowNavShown ? 'nav-menu show' : 'nav-menu'}
        onClick={hideNarrowMenu}
      >
        {items}
      </ul>
    </nav>
  );
};

Nav.propTypes = {
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Nav;
