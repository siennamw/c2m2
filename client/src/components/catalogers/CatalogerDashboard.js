import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import Nav from '../nav/Nav';

import CatalogerHome from "./CatalogerHome";
import CatalogerForm from "../forms/CatalogerForm";
import CollectionForm from "../forms/CollectionForm";
import RepositoryForm from "../forms/RepositoryForm";

const CatalogerDashboard = ({ match }) => {
  return (
    <div>
      <h2>Cataloger Dashboard</h2>
      <Nav>
          <Link to={`${match.path}`}>Home</Link>
          <Link to={`${match.path}/cataloger`}>New Cataloger</Link>
          <Link to={`${match.path}/collection`}>New Collection</Link>
          <Link to={`${match.path}/repository`}>New Repository</Link>
      </Nav>
      <div className="tabs">
        <Switch>
          <Route exact path={`${match.path}`} component={CatalogerHome} />
          <Route path={`${match.path}/cataloger`} component={CatalogerForm} />
          <Route path={`${match.path}/collection`} component={CollectionForm} />
          <Route path={`${match.path}/repository`} component={RepositoryForm} />
        </Switch>
      </div>
    </div>
  )
};

export default CatalogerDashboard;
