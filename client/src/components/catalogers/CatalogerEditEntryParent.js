import React from 'react';
import { Route, Switch } from 'react-router-dom';

import EditCataloger from '../entries/cataloger/EditCataloger';
import EditCollection from '../entries/collection/EditCollection';
import EditComposer from '../entries/composer/EditComposer';
import EditCountry from '../entries/country/EditCountry';
import EditDirector from '../entries/director/EditDirector';
import EditWork from '../entries/work/EditWork';
import EditMaterialFormat from '../entries/materialFormat/EditMaterialFormat';
import EditMediaType from '../entries/mediaType/EditMediaType';
import EditProductionCompany from '../entries/productionCompany/EditProductionCompany';
import EditRepository from '../entries/repository/EditRepository';
import EditResource from '../entries/resource/EditResource';
import UnknownRoute from '../UnknownRoute';

const CatalogerEditEntryParent = ({ match }) => (
  <Switch>
    <Route exact path={`${match.path}/cataloger/:id`} component={EditCataloger} />
    <Route exact path={`${match.path}/collection/:id`} component={EditCollection} />
    <Route exact path={`${match.path}/composer/:id`} component={EditComposer} />
    <Route exact path={`${match.path}/country/:id`} component={EditCountry} />
    <Route exact path={`${match.path}/director/:id`} component={EditDirector} />
    <Route exact path={`${match.path}/work/:id`} component={EditWork} />
    <Route exact path={`${match.path}/material_format/:id`} component={EditMaterialFormat} />
    <Route exact path={`${match.path}/media_type/:id`} component={EditMediaType} />
    <Route exact path={`${match.path}/production_company/:id`} component={EditProductionCompany} />
    <Route exact path={`${match.path}/repository/:id`} component={EditRepository} />
    <Route exact path={`${match.path}/resource/:id`} component={EditResource} />
    <Route component={UnknownRoute} />
  </Switch>
);

export default CatalogerEditEntryParent;
