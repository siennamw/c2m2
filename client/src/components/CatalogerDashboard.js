import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import CatalogerHome from "./CatalogerHome";
import CatalogerSignIn from "./CatalogerSignIn";
import CatalogerForm from "./forms/CatalogerForm";
import CollectionForm from "./forms/CollectionForm";
import RepositoryForm from "./forms/RepositoryForm";

const CatalogerDashboard = ({ match }) => {
  return (
    <div>
      <h2>Cataloger Dashboard</h2>
      <nav className='dashboard-nav'>
        <ul>
          <li><Link to={`${match.path}`}>Home</Link></li>
          <li><Link to={`${match.path}/sign-in`}>Sign In</Link></li>
          <li><Link to={`${match.path}/cataloger`}>New Cataloger</Link></li>
          <li><Link to={`${match.path}/collection`}>New Collection</Link></li>
          <li><Link to={`${match.path}/repository`}>New Repository</Link></li>
        </ul>
      </nav>
      <div className="tabs">
        <Switch>
          <Route exact path={`${match.path}`} component={CatalogerHome} />
          <Route path={`${match.path}/sign-in`} component={CatalogerSignIn} />
          <Route path={`${match.path}/cataloger`} component={CatalogerForm} />
          <Route path={`${match.path}/collection`} component={CollectionForm} />
          <Route path={`${match.path}/repository`} component={RepositoryForm} />
        </Switch>
      </div>
    </div>
  )
};

export default CatalogerDashboard;
