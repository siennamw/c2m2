import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Header from './Header';

import Home from './Home';
import About from './About';
import Vision from './Vision';
import UnknownRoute from './UnknownRoute';

class App extends React.Component {
  render() {
    return (
      <div className="app container">
        <Header/>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/about" component={About}/>
            <Route exact path="/vision" component={Vision}/>
            <Route component={UnknownRoute}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
