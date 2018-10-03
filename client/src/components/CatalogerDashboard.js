import React from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import CatalogerHome from "./CatalogerHome";
import CatalogerForm from "./forms/CatalogerForm";

const CatalogerDashboard = ({ match }) => {
  return (
    <div>
      <h2>Cataloger Dashboard</h2>
      <nav className='dashboard-nav'>
        <ul>
          <li><Link to={`${match.path}`}>Home</Link></li>
          <li><Link to={`${match.path}/cataloger`}>Cataloger</Link></li>
        </ul>
      </nav>
      <div className="tabs">
        <Switch>
          <Route exact path={`${match.path}`} component={CatalogerHome} />
          <Route path={`${match.path}/cataloger`} component={CatalogerForm} />
        </Switch>
      </div>
    </div>
  )
};

export default CatalogerDashboard;
