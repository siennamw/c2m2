import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import CatalogerForm from '../entries/cataloger/CatalogerForm';
import CollectionForm from '../entries/collection/CollectionForm';
import ComposerForm from '../entries/composer/ComposerForm';
import CountryForm from '../entries/country/CountryForm';
import DirectorForm from '../entries/director/DirectorForm';
import MaterialFormatForm from '../entries/materialFormat/MaterialFormatForm';
import MediaTypeForm from '../entries/mediaType/MediaTypeForm';
import ProductionCompanyForm from '../entries/productionCompany/ProductionCompanyForm';
import RepositoryForm from '../entries/repository/RepositoryForm';
import ResourceForm from '../entries/resource/ResourceForm';
import WorkForm from '../entries/work/WorkForm';

import DeleteSuccessful from './DeleteSuccessful';
import UnknownRoute from '../UnknownRoute';

const CatalogerEditEntryParent = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/cataloger/:id`} component={CatalogerForm} />
    <Route exact path={`${match.path}/collection/:id`} component={CollectionForm} />
    <Route exact path={`${match.path}/composer/:id`} component={ComposerForm} />
    <Route exact path={`${match.path}/country/:id`} component={CountryForm} />
    <Route exact path={`${match.path}/director/:id`} component={DirectorForm} />
    <Route exact path={`${match.path}/material_format/:id`} component={MaterialFormatForm} />
    <Route exact path={`${match.path}/media_type/:id`} component={MediaTypeForm} />
    <Route exact path={`${match.path}/production_company/:id`} component={ProductionCompanyForm} />
    <Route exact path={`${match.path}/repository/:id`} component={RepositoryForm} />
    <Route exact path={`${match.path}/resource/:id`} component={ResourceForm} />
    <Route exact path={`${match.path}/work/:id`} component={WorkForm} />
    <Route exact path={`${match.path}/delete-successful`} component={DeleteSuccessful} />
    <Route component={UnknownRoute} />
  </Switch>
);

CatalogerEditEntryParent.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default CatalogerEditEntryParent;
