import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './Header';
import Footer from './footer/Footer';

import ApolloContext from './ApolloContext';

import About from './About';
import Browse from './Browse';
import CatalogerDashboard from './catalogers/CatalogerDashboard';
import CatalogerSignIn from './catalogers/CatalogerSignIn';
import CatalogerSignOut from './catalogers/CatalogerSignOut';
import GeneralContact from './contact/GeneralContact';
import Home from './Home';
import RequestResetPassword from './catalogers/RequestResetPassword';
import ResetPassword from './catalogers/ResetPassword';
import ResourceSuggestion from './contact/ResourceSuggestion';
import SearchAdvanced from './entries/SearchAdvanced';
import SearchSimple from './entries/SearchSimple';

import DetailedCataloger from './entries/cataloger/DetailedCataloger';
import DetailedCollection from './entries/collection/DetailedCollection';
import DetailedComposer from './entries/composer/DetailedComposer';
import DetailedCountry from './entries/country/DetailedCountry';
import DetailedDirector from './entries/director/DetailedDirector';
import DetailedWork from './entries/work/DetailedWork';
import DetailedMaterialFormat
  from './entries/materialFormat/DetailedMaterialFormat';
import DetailedMediaType from './entries/mediaType/DetailedMediaType';
import DetailedProductionCompany
  from './entries/productionCompany/DetailedProductionCompany';
import DetailedRepository from './entries/repository/DetailedRepository';
import DetailedResource from './entries/resource/DetailedResource';

import PrivateRoute from './PrivateRoute';
import UnknownRoute from './UnknownRoute';

import AuthContextProvider from './AuthContext';

const App = () => (
  <ApolloContext>
    <AuthContextProvider>
      <div className="app container" id="top">
        <Header />
        <main>
          <Switch>
            {/* informational routes */}
            <Route
              exact
              path="/"
              component={Home}
            />
            <Route
              exact
              path="/about"
              component={About}
            />

            {/* contact and suggestion routes */}
            <Route
              exact
              path="/contact"
              component={GeneralContact}
            />
            <Route
              exact
              path="/suggest"
              component={ResourceSuggestion}
            />

            {/* browse and search routes */}
            <Route
              exact
              path="/works"
              component={Browse}
            />
            <Route
              exact
              path="/search-advanced"
              component={SearchAdvanced}
            />
            <Route
              exact
              path="/search"
              component={SearchSimple}
            />

            {/* detailed entry routes */}
            <Route
              exact
              path="/cataloger/:id"
              component={DetailedCataloger}
            />
            <Route
              exact
              path="/collection/:id"
              component={DetailedCollection}
            />
            <Route
              exact
              path="/composer/:id"
              component={DetailedComposer}
            />
            <Route
              exact
              path="/country/:id"
              component={DetailedCountry}
            />
            <Route
              exact
              path="/director/:id"
              component={DetailedDirector}
            />
            <Route
              exact
              path="/work/:id"
              component={DetailedWork}
            />
            <Route
              exact
              path="/material_format/:id"
              component={DetailedMaterialFormat}
            />
            <Route
              exact
              path="/media_type/:id"
              component={DetailedMediaType}
            />
            <Route
              exact
              path="/production_company/:id"
              component={DetailedProductionCompany}
            />
            <Route
              exact
              path="/repository/:id"
              component={DetailedRepository}
            />
            <Route
              exact
              path="/resource/:id"
              component={DetailedResource}
            />

            {/* account routes */}
            <Route
              exact
              path="/reset-password/:resetToken"
              component={ResetPassword}
            />
            <Route
              exact
              path="/request-reset-password"
              component={RequestResetPassword}
            />
            <Route
              exact
              path="/sign-in"
              component={CatalogerSignIn}
            />

            {/* private routes */}
            <PrivateRoute
              path="/sign-out"
              component={CatalogerSignOut}
            />
            <PrivateRoute
              path="/dashboard"
              component={CatalogerDashboard}
            />

            {/* unknown route (fallback) */}
            <Route
              component={UnknownRoute}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    </AuthContextProvider>
  </ApolloContext>
);

export default App;
