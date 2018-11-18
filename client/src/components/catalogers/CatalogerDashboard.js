import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom'

import Nav from '../nav/Nav';

import CatalogerHome from './CatalogerHome';

import CatalogerForm from '../forms/CatalogerForm';
import CollectionForm from '../forms/CollectionForm';
import NewCountry from '../forms/country/NewCountry';
import NewMediaType from '../forms/mediaType/NewMediaType';
import NewRepository from '../forms/repository/NewRepository';

const CatalogerDashboard = ({ match }) => {
  return (
    <div>
      <h2>Cataloger Dashboard</h2>
      <Nav>
        <NavLink to={`${match.path}/home`}>Home</NavLink>
        <NavLink to={`${match.path}/country`}>New Country</NavLink>
        <NavLink to={`${match.path}/media-type`}>New Media Type</NavLink>
        <NavLink to={`${match.path}/repository`}>New Repository</NavLink>
        <NavLink to={`${match.path}/cataloger`}>New Cataloger</NavLink>
        <NavLink to={`${match.path}/collection`}>New Collection</NavLink>
        <NavLink to={'/sign-out'}>Sign Out</NavLink>
      </Nav>
      <div className='tabs'>
        <Switch>
          <Route exact path={`${match.path}/home`} component={CatalogerHome} />
          <Route exact path={`${match.path}/country`} component={NewCountry} />
          <Route exact path={`${match.path}/media-type`} component={NewMediaType} />
          <Route exact path={`${match.path}/repository`} component={NewRepository} />
          <Route exact path={`${match.path}/cataloger`} component={CatalogerForm} />
          <Route exact path={`${match.path}/collection`} component={CollectionForm} />
          <Route component={CatalogerHome}/>
        </Switch>
      </div>
    </div>
  )
};

export default CatalogerDashboard;
