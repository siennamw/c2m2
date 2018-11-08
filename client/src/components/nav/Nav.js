import React from 'react';

class Nav extends React.Component {
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
    const items = this.props.children.map((item, index) => {
      if(item.type.name !== 'NavSubMenu'){
        return <li key={index}>{item}</li>;
      } else {
        return item
      }
    });

    return (
      <nav>
        <button className="nav-toggle button-primary u-full-width"
                aria-expanded={this.state.narrowNavShown}
                onClick={this.state.narrowNavShown ? this.hideNarrowMenu : this.showNarrowMenu}>
          Show/Hide Menu
        </button>
        <ul className={this.state.narrowNavShown ? 'nav-menu show' : 'nav-menu'}
            onClick={this.hideNarrowMenu}>
          {items}
        </ul>
      </nav>
    )
  }
}

export default Nav;
