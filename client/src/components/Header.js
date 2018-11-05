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
              <NavLink to="/works" onClick={this.hideNarrowMenu}>
                Browse
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" onClick={this.hideNarrowMenu}>
                Search
              </NavLink>
            </li>
            <li><a>Contact</a>
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
            </li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;
