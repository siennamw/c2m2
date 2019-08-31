import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import Nav from '../nav/Nav';

import CatalogerHome from './CatalogerHome';
import CatalogerNewEntryParent from './CatalogerNewEntryParent';
import CatalogerEditEntryParent from './CatalogerEditEntryParent';

import UnknownRoute from '../UnknownRoute';

const CatalogerDashboard = ({ match }) => (
  <div>
    <h2>Cataloger Dashboard</h2>
    <Nav ariaLabel="Cataloger dashboard">
      <NavLink to={`${match.path}/home`}>Home</NavLink>
      <NavLink to={`${match.path}/new`}>New Entry</NavLink>
      <NavLink to="/sign-out">Sign Out</NavLink>
    </Nav>
    <Switch>
      <Route path={`${match.path}/home`} component={CatalogerHome} />
      <Route path={`${match.path}/new`} component={CatalogerNewEntryParent} />
      <Route path={`${match.path}/edit`} component={CatalogerEditEntryParent} />
      <Route component={UnknownRoute} />
    </Switch>
  </div>
);

export default CatalogerDashboard;
