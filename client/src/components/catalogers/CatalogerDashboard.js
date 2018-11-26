import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom'

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

const CatalogerDashboard = ({ match }) => {
  return (
    <div>
      <h2>Cataloger Dashboard</h2>
      <Nav>
        <NavLink to={`${match.path}/home`}>Home</NavLink>
        <NavLink to={`${match.path}/cataloger`}>New Cataloger</NavLink>
        <NavLink to={`${match.path}/collection`}>New Collection</NavLink>
        <NavLink to={`${match.path}/composer`}>New Composer</NavLink>
        <NavLink to={`${match.path}/country`}>New Country</NavLink>
        <NavLink to={`${match.path}/director`}>New Director</NavLink>
        <NavLink to={`${match.path}/material-format`}>New Material Format</NavLink>
        <NavLink to={`${match.path}/media-type`}>New Media Type</NavLink>
        <NavLink to={`${match.path}/production-company`}>New Production Company</NavLink>
        <NavLink to={`${match.path}/publisher`}>New Publisher</NavLink>
        <NavLink to={`${match.path}/repository`}>New Repository</NavLink>
        <NavLink to={'/sign-out'}>Sign Out</NavLink>
      </Nav>
      <div className='tabs'>
        <Switch>
          <Route exact path={`${match.path}/home`} component={CatalogerHome} />
          <Route exact path={`${match.path}/cataloger`} component={NewCataloger} />
          <Route exact path={`${match.path}/collection`} component={NewCollection} />
          <Route exact path={`${match.path}/composer`} component={NewComposer} />
          <Route exact path={`${match.path}/country`} component={NewCountry} />
          <Route exact path={`${match.path}/director`} component={NewDirector} />
          <Route exact path={`${match.path}/material-format`} component={NewMaterialFormat} />
          <Route exact path={`${match.path}/media-type`} component={NewMediaType} />
          <Route exact path={`${match.path}/production-company`} component={NewProductionCompany} />
          <Route exact path={`${match.path}/publisher`} component={NewPublisher} />
          <Route exact path={`${match.path}/repository`} component={NewRepository} />
          <Route component={CatalogerHome}/>
        </Switch>
      </div>
    </div>
  )
};

export default CatalogerDashboard;
