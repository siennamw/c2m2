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

import DetailedComposer from './entries/composer/DetailedComposer';
import DetailedCountry from './entries/country/DetailedCountry';
import DetailedDirector from './entries/director/DetailedDirector';
import DetailedMaterialFormat from './entries/materialFormat/DetailedMaterialFormat';
import DetailedMediaType from './entries/mediaType/DetailedMediaType';
import DetailedProductionCompany from './entries/productionCompany/DetailedProductionCompany';
import DetailedPublisher from './entries/publisher/DetailedPublisher';
import DetailedRepository from './entries/repository/DetailedRepository';
import DetailedWork from './entries/work/DetailedWork';

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

              <Route exact path="/composer/:id" component={DetailedComposer} />
              <Route exact path="/country/:id" component={DetailedCountry} />
              <Route exact path="/director/:id" component={DetailedDirector} />
              <Route exact path="/material_format/:id" component={DetailedMaterialFormat} />
              <Route exact path="/media_type/:id" component={DetailedMediaType} />
              <Route exact path="/production_company/:id" component={DetailedProductionCompany} />
              <Route exact path="/publisher/:id" component={DetailedPublisher} />
              <Route exact path="/repository/:id" component={DetailedRepository} />
              <Route exact path="/work/:id" component={DetailedWork} />

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
