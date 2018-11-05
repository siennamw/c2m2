import React from 'react';
import { NavLink } from 'react-router-dom';


const FooterLinks = () => {
  return (
      <div id='footer-links' className='row'>
        <div className='three columns'>
          <h5>Contact</h5>
          <ul>
            <li>
              <NavLink to="/contact" onClick={this.hideNarrowMenu}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/suggest" onClick={this.hideNarrowMenu}>
                Suggest a Resource
              </NavLink>
            </li>
          </ul>
          <h5>Contributors</h5>
          <ul>
            <li>
              <NavLink to="/sign-in" onClick={this.hideNarrowMenu}>
                Sign-In
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='three columns'>
          <h5>About</h5>
          <ul>
            <li>
              <NavLink to="/vision" onClick={this.hideNarrowMenu}>
                Vision &amp; Design
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={this.hideNarrowMenu}>
                Why C2M2?
              </NavLink>
            </li>
          </ul>
        </div>
        <div className='six columns'>
          <h5>External Links</h5>
          <ul>
            <li>
              <a href="http://www.michaelwharris.net/" target="_blank"
                 rel="noopener noreferrer" onClick={this.hideNarrowMenu}>
                Michael W. Harris: Librarian, Archivist, and Musicologist
              </a>
            </li>
            <li>
              <a href="http://www.thetemptrack.com" target="_blank" rel="noopener noreferrer"
                 onClick={this.hideNarrowMenu}>
                The Temp Track
              </a>
            </li>
            <li>
              <a href="http://www.siennamwood.com" target="_blank" rel="noopener noreferrer"
                 onClick={this.hideNarrowMenu}>
                Sienna M. Wood: Software Engineer and Musicologist
              </a>
            </li>
          </ul>
        </div>
      </div>
  )
};

export default FooterLinks;
