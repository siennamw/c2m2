import React from 'react';

import icon from '../c2m2_logo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { narrowNavShown: false };
  }

  toggleNarrowMenu = () => {
    this.setState({ narrowNavShown: !this.state.narrowNavShown })
  };

  render() {
    return (
      <header>
        <div className="center-text">
          <a href="/"><img className="logo" src={icon} alt="C2M2"/></a>
          <h1 className="title"><a href="/">Collections of Cinema and Media Music</a></h1>
        </div>
        <nav id="main-nav">
          <button className="nav-toggle button-primary" aria-expanded={this.state.narrowNavShown}
                  onClick={this.toggleNarrowMenu}>
            Show/Hide Menu
          </button>
          <ul id="nav-menu" className={this.state.narrowNavShown ? 'show' : undefined}>
            <li><a href="/">Home</a></li>
            <li><a href="#">Vision &amp; Design</a></li>
            <li><a href="#">Why C2M2?</a></li>
            <li><a href="#">External Links</a>
              <ul>
                <li>
                  <a href="http://www.michaelwharris.net/" target="_blank"
                     rel="noopener noreferrer">
                    Michael W. Harris: Archivist and Film Musicologist
                  </a>
                </li>
                <li>
                  <a href="http://www.thetemptrack.com" target="_blank" rel="noopener noreferrer">
                    The Temp Track
                  </a>
                </li>
                <li>
                  <a href="http://www.siennamwood.com" target="_blank" rel="noopener noreferrer">
                    Sienna M. Wood: Musicologist and Web Developer
                  </a>
                </li>
              </ul>
            </li>
            <li><a href="#">Suggest a Resource</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Header;
