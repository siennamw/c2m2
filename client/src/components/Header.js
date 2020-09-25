import React from 'react';
import { NavLink } from 'react-router-dom';

import icon from '../images/c2m2_logo.svg';

import Nav from './nav/Nav';
import NavSubMenu from './nav/NavSubMenu';

const Header = () => (
  <header>
    <div className="center-text">
      <NavLink to="/">
        <img className="logo" src={icon} alt="C2M2" />
      </NavLink>
      <h1 className="title">
        <NavLink to="/">
          Collections of Cinema and Media Music
        </NavLink>
      </h1>
    </div>
    <Nav ariaLabel="Main">
      <NavLink exact to="/">Home</NavLink>
      <NavLink to="/works">Browse</NavLink>
      <NavSubMenu name="Search">
        <NavLink to="/search">Simple Search</NavLink>
        <NavLink to="/search-advanced">Advanced Search</NavLink>
      </NavSubMenu>
      <NavSubMenu name="Contact">
        <NavLink to="/contact">Contact Us</NavLink>
        <NavLink to="/suggest">Suggest a Resource</NavLink>
      </NavSubMenu>
    </Nav>
  </header>
);

export default Header;
