import React from 'react';
import { NavLink } from 'react-router-dom';

import { isAuthenticated } from "../../utils";

const FooterLinks = () => {
  return (
    <div id='footer-links' className='row'>
      <div className='three columns'>
        <h5>Contact</h5>
        <ul>
          <li>
            <NavLink to="/contact">
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/suggest">
              Suggest a Resource
            </NavLink>
          </li>
        </ul>
        <h5>Contributors</h5>
        <ul>
          {
            isAuthenticated() ?
              <li>
                <NavLink to="/dashboard/home">Cataloger Home</NavLink>
              </li> :
              undefined
          }
          <li>
            {
              isAuthenticated() ?
                <NavLink to="/sign-out">Sign Out</NavLink> :
                <NavLink to="/sign-in">Sign In</NavLink>
            }
          </li>
        </ul>
      </div>
      <div className='three columns'>
        <h5>About</h5>
        <ul>
          <li>
            <NavLink to="/vision">
              Vision &amp; Design
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              Why C2M2?
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='six columns'>
        <h5>External Links</h5>
        <ul>
          <li>
            <a href="http://www.michaelwharris.net/"
               target="_blank"
               rel="noopener noreferrer"
            >
              Michael W. Harris: Librarian, Archivist, and Musicologist
            </a>
          </li>
          <li>
            <a href="http://www.thetemptrack.com"
               target="_blank"
               rel="noopener noreferrer"
            >
              The Temp Track
            </a>
          </li>
          <li>
            <a href="http://www.siennamwood.com"
               target="_blank"
               rel="noopener noreferrer"
            >
              Sienna M. Wood: Software Engineer and Musicologist
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default FooterLinks;
