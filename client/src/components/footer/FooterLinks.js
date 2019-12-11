import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../App';

const FooterLinks = () => {
  const { authenticated } = useContext(AuthContext);
  return (
    <div id="footer-links" className="row">
      <div className="three columns">
        <h1 className="h5">Contact</h1>
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
        <h1 className="h5">Contributors</h1>
        <ul>
          {
            authenticated
              ? (
                <li>
                  <NavLink to="/dashboard/home">Cataloger Home</NavLink>
                </li>
              )
              : undefined
          }
          <li>
            {
              authenticated
                ? <NavLink to="/sign-out">Sign Out</NavLink>
                : <NavLink to="/sign-in">Sign In</NavLink>
            }
          </li>
        </ul>
      </div>
      <div className="three columns">
        <h1 className="h5">About</h1>
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
      <div className="six columns">
        <h1 className="h5">External Links</h1>
        <ul>
          <li>
            <a
              href="http://www.michaelwharris.net/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Michael W. Harris: Librarian, Archivist, and Musicologist
            </a>
          </li>
          <li>
            <a
              href="http://www.thetemptrack.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              The Temp Track
            </a>
          </li>
          <li>
            <a
              href="http://www.siennamwood.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sienna M. Wood: Software Engineer and Musicologist
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FooterLinks;
