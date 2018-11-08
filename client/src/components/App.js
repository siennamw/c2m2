import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './footer/Footer';

import About from './About';
import CatalogerDashboard from './catalogers/CatalogerDashboard';
import CatalogerSignIn from './catalogers/CatalogerSignIn';
import GeneralContact from './contact/GeneralContact';
import Home from './Home';
import ResourceSuggestion from './contact/ResourceSuggestion';
import Vision from './Vision';
import WorksList from './WorksList';

import PrivateRoute from './PrivateRoute';

import UnknownRoute from './UnknownRoute';

class App extends React.Component {
  render() {
    return (
      <div className="app container">
        <Header/>
        <main>
          <Switch>
            <Route exact path="/about" component={About}/>
            <Route exact path="/sign-in" component={CatalogerSignIn}/>
            <Route exact path="/contact" component={GeneralContact}/>
            <Route exact path="/" component={Home}/>
            <Route exact path="/suggest" component={ResourceSuggestion}/>
            <Route exact path="/vision" component={Vision}/>
            <Route exact path="/works" component={WorksList}/>

            <PrivateRoute path="/dashboard" component={CatalogerDashboard}/>

            <Route component={UnknownRoute}/>
          </Switch>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default App;
