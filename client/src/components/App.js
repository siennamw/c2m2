import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './footer/Footer';
import { ModalProvider } from './modal/ModalContext';
import ModalRoot from './modal/ModalRoot';

import About from './About';
import CatalogerDashboard from './catalogers/CatalogerDashboard';
import CatalogerSignIn from './catalogers/CatalogerSignIn';
import CatalogerSignOut from './catalogers/CatalogerSignOut';
import GeneralContact from './contact/GeneralContact';
import Home from './Home';
import ResourceSuggestion from './contact/ResourceSuggestion';
import SimpleSearch from './Search';
import Vision from './Vision';
import Browse from './Browse';

import PrivateRoute from './PrivateRoute';

import UnknownRoute from './UnknownRoute';

class App extends React.Component {
  componentDidUpdate() {
    document.getElementById('top').scrollIntoView(true);
  }

  render() {
    return (
      <ModalProvider>
        <div className="app container" id="top">
          <Header />
          <main>
            <Switch>
              <Route exact path="/about" component={About} />
              <Route exact path="/sign-in" component={CatalogerSignIn} />
              <Route exact path="/sign-out" component={CatalogerSignOut} />
              <Route exact path="/contact" component={GeneralContact} />
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={SimpleSearch} />
              <Route exact path="/suggest" component={ResourceSuggestion} />
              <Route exact path="/vision" component={Vision} />
              <Route exact path="/works" component={Browse} />

              <PrivateRoute path="/dashboard" component={CatalogerDashboard} />

              <Route component={UnknownRoute} />
            </Switch>
          </main>
          <Footer />
        </div>
        <ModalRoot />
      </ModalProvider>
    );
  }
}

export default App;
