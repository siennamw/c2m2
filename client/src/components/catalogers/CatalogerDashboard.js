import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Route, Switch } from 'react-router-dom';

import { AuthContext } from '../AuthContext';

import Nav from '../nav/Nav';

import BulkUpload from './BulkUpload';
import CatalogerDirectory from './CatalogerDirectory';
import CatalogerForm from '../entries/cataloger/CatalogerForm';
import CatalogerHome from './CatalogerHome';
import CatalogerNewEntryParent from './CatalogerNewEntryParent';
import CatalogerEditEntryParent from './CatalogerEditEntryParent';

import MaterialFormatsList from '../entries/materialFormat/MaterialFormatsList';
import MediaTypesList from '../entries/mediaType/MediaTypesList';

import UnknownRoute from '../UnknownRoute';

const CatalogerDashboard = ({ match }) => {
  const { admin } = useContext(AuthContext);

  return (
    <div>
      <h2>Cataloger Dashboard</h2>
      <Nav ariaLabel="Cataloger dashboard">
        <NavLink to={`${match.path}/home`}>Cataloger Home</NavLink>
        <NavLink to={`${match.path}/new`}>New Entry</NavLink>
        {
          admin
            ? <NavLink to={`${match.path}/bulk-upload`}>Bulk Upload</NavLink>
            : null
        }
        <NavLink to={`${match.path}/directory`}>Directory</NavLink>
        <NavLink to={`${match.path}/account`}>Account</NavLink>
        <NavLink to="/sign-out">Sign Out</NavLink>
      </Nav>
      <Switch>
        <Route path={`${match.path}/account`} component={CatalogerForm} />
        <Route path={`${match.path}/bulk-upload`} component={BulkUpload} />
        <Route path={`${match.path}/directory`} component={CatalogerDirectory} />
        <Route path={`${match.path}/edit`} component={CatalogerEditEntryParent} />
        <Route path={`${match.path}/home`} component={CatalogerHome} />
        <Route path={`${match.path}/new`} component={CatalogerNewEntryParent} />

        <Route path={`${match.path}/material-formats`} component={MaterialFormatsList} />
        <Route path={`${match.path}/media-types`} component={MediaTypesList} />

        <Route component={UnknownRoute} />
      </Switch>
    </div>
  );
};

CatalogerDashboard.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default CatalogerDashboard;
