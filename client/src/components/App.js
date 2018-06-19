import React from 'react';
import Home from './Home';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <div className="app container">
        <Header />
        <main>
          <Home />
        </main>
      </div>
    );
  }
}

export default App;
