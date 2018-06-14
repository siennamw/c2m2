import React, { Component } from 'react';
import Header from './Header';

class App extends Component {
  render() {
    return (
      <div className="app container">
        <Header />
        <main>
          <p>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </main>
      </div>
    );
  }
}

export default App;
