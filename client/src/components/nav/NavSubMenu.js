import React from 'react';

const NavSubMenu = (props) => {
  const items = props.children.map((link, index) => <li key={index}>{link}</li>);

  return (
    <li>
      <a>{props.name}</a>
      <ul>
        {items}
      </ul>
    </li>
  );
};

export default NavSubMenu;
