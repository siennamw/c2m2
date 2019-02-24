import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import Nav from '../nav/Nav';

import CatalogerHome from './CatalogerHome';

import NewCataloger from '../entries/cataloger/NewCataloger';
import NewCollection from '../entries/collection/NewCollection';
import NewComposer from '../entries/composer/NewComposer';
import NewCountry from '../entries/country/NewCountry';
import NewDirector from '../entries/director/NewDirector';
import NewMaterialFormat from '../entries/materialFormat/NewMaterialFormat';
import NewMediaType from '../entries/mediaType/NewMediaType';
import NewProductionCompany from '../entries/productionCompany/NewProductionCompany';
import NewPublisher from '../entries/publisher/NewPublisher';
import NewRepository from '../entries/repository/NewRepository';
import NewWork from '../entries/work/NewWork';

// import EditCataloger from '../entries/cataloger/EditCataloger';
// import EditCollection from '../entries/collection/EditCollection';
// import EditComposer from '../entries/composer/EditComposer';
import EditCountry from '../entries/country/EditCountry';
import EditDirector from '../entries/director/EditDirector';
import EditMaterialFormat from '../entries/materialFormat/EditMaterialFormat';
import EditMediaType from '../entries/mediaType/EditMediaType';
import EditProductionCompany from '../entries/productionCompany/EditProductionCompany';
import EditPublisher from '../entries/publisher/EditPublisher';
import EditRepository from '../entries/repository/EditRepository';
import EditWork from '../entries/work/EditWork';

const CatalogerDashboard = ({ match }) => (
  <div>
    <h2>Cataloger Dashboard</h2>
    <Nav>
      <NavLink to={`${match.path}/home`}>Home</NavLink>

      <NavLink to={`${match.path}/new/cataloger`}>New Cataloger</NavLink>
      <NavLink to={`${match.path}/new/collection`}>New Collection</NavLink>
      <NavLink to={`${match.path}/new/composer`}>New Composer</NavLink>
      <NavLink to={`${match.path}/new/country`}>New Country</NavLink>
      <NavLink to={`${match.path}/new/director`}>New Director</NavLink>
      <NavLink to={`${match.path}/new/material-format`}>New Material Format</NavLink>
      <NavLink to={`${match.path}/new/media-type`}>New Media Type</NavLink>
      <NavLink to={`${match.path}/new/production-company`}>New Production Company</NavLink>
      <NavLink to={`${match.path}/new/publisher`}>New Publisher</NavLink>
      <NavLink to={`${match.path}/new/repository`}>New Repository</NavLink>
      <NavLink to={`${match.path}/new/work`}>New Work</NavLink>

      <NavLink to="/sign-out">Sign Out</NavLink>
    </Nav>
    <div className="tabs">
      <Switch>
        <Route exact path={`${match.path}/home`} component={CatalogerHome} />

        <Route exact path={`${match.path}/new/cataloger`} component={NewCataloger} />
        <Route exact path={`${match.path}/new/collection`} component={NewCollection} />
        <Route exact path={`${match.path}/new/composer`} component={NewComposer} />
        <Route exact path={`${match.path}/new/country`} component={NewCountry} />
        <Route exact path={`${match.path}/new/director`} component={NewDirector} />
        <Route exact path={`${match.path}/new/material-format`} component={NewMaterialFormat} />
        <Route exact path={`${match.path}/new/media-type`} component={NewMediaType} />
        <Route exact path={`${match.path}/new/production-company`} component={NewProductionCompany} />
        <Route exact path={`${match.path}/new/publisher`} component={NewPublisher} />
        <Route exact path={`${match.path}/new/repository`} component={NewRepository} />
        <Route exact path={`${match.path}/new/work`} component={NewWork} />

        {/*<Route exact path={`${match.path}/edit/cataloger/:id`} component={EditCataloger} />*/}
        {/*<Route exact path={`${match.path}/edit/collection/:id`} component={EditCollection} />*/}
        {/*<Route exact path={`${match.path}/edit/composer/:id`} component={EditComposer} />*/}
        <Route exact path={`${match.path}/edit/country/:id`} component={EditCountry} />
        <Route exact path={`${match.path}/edit/director/:id`} component={EditDirector} />
        <Route exact path={`${match.path}/edit/material_format/:id`} component={EditMaterialFormat} />
        <Route exact path={`${match.path}/edit/media_type/:id`} component={EditMediaType} />
        <Route exact path={`${match.path}/edit/production_company/:id`} component={EditProductionCompany} />
        <Route exact path={`${match.path}/edit/publisher/:id`} component={EditPublisher} />
        <Route exact path={`${match.path}/edit/repository/:id`} component={EditRepository} />
        <Route exact path={`${match.path}/edit/work/:id`} component={EditWork} />

        <Route component={CatalogerHome} />
      </Switch>
    </div>
  </div>
);

export default CatalogerDashboard;
