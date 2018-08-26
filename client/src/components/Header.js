import React from 'react';
import { NavLink } from 'react-router-dom';

import icon from '../images/c2m2_logo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { narrowNavShown: false };
  }

  hideNarrowMenu = () => {
    this.setState({ narrowNavShown: false });
  };

  showNarrowMenu = () => {
    this.setState({ narrowNavShown: true });
  };

  render() {
    return (
      <header>
        <div className="center-text">
          <NavLink to="/"><img className="logo" src={icon} alt="C2M2"/></NavLink>
          <h1 className="title"><a href="/">Collections of Cinema and Media Music</a></h1>
        </div>
        <nav id="main-nav">
          <button className="nav-toggle button-primary" aria-expanded={this.state.narrowNavShown}
                  onClick={this.state.narrowNavShown ? this.hideNarrowMenu : this.showNarrowMenu}>
            Show/Hide Menu
          </button>
          <ul id="nav-menu" className={this.state.narrowNavShown ? 'show' : undefined}>
            <li>
              <NavLink exact to="/" onClick={this.hideNarrowMenu}>
                Home
              </NavLink>
            </li>
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
            <li><a>External Links</a>
              <ul>
                <li>
                  <a href="http://www.michaelwharris.net/" target="_blank"
                     rel="noopener noreferrer" onClick={this.hideNarrowMenu}>
                    Michael W. Harris: Archivist and Film Musicologist
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
            </li>
            <li>
              <NavLink to="/suggest" onClick={this.hideNarrowMenu}>
                Suggest a Resource
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" onClick={this.hideNarrowMenu}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;
