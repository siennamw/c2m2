import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import CatalogersList from '../entries/cataloger/CatalogersList';
import CollectionsList from '../entries/collection/CollectionsList';
import ComposersList from '../entries/composer/ComposersList';
import CountriesList from '../entries/country/CountriesList';
import DirectorsList from '../entries/director/DirectorsList';
import MaterialFormatsList from '../entries/materialFormat/MaterialFormatsList';
import MediaTypesList from '../entries/mediaType/MediaTypesList';
import ProductionCompaniesList
  from '../entries/productionCompany/ProductionCompaniesList';
import RepositoriesList from '../entries/repository/RepositoriesList';
import ResourcesList from '../entries/resource/ResourcesList';
import WorksList from '../entries/work/WorksList';

import * as utils from '../../utils';
import { MODEL_NAMES } from '../../constants';
import LinkToParentRoute from '../nav/LinkToParentRoute';

const CatalogerView = ({ match }) => {
  const home = (
    <>
      <h3>View Entries</h3>
      <ul>
        {
          MODEL_NAMES.map((field) => {
            return (
              <li key={field}>
                <Link to={`${match.path}/${field}`}>
                  {utils.convertFieldNameToDisplayName(field)}
                </Link>
              </li>
            );
          })
        }
      </ul>
    </>
  );

  return (
    <>
      <LinkToParentRoute />
      <Switch>
        <Route exact path={`${match.path}/cataloger`} component={CatalogersList} />
        <Route exact path={`${match.path}/collection`} component={CollectionsList} />
        <Route exact path={`${match.path}/composer`} component={ComposersList} />
        <Route exact path={`${match.path}/country`} component={CountriesList} />
        <Route exact path={`${match.path}/director`} component={DirectorsList} />
        <Route exact path={`${match.path}/material_format`} component={MaterialFormatsList} />
        <Route exact path={`${match.path}/media_type`} component={MediaTypesList} />
        <Route exact path={`${match.path}/production_company`} component={ProductionCompaniesList} />
        <Route exact path={`${match.path}/repository`} component={RepositoriesList} />
        <Route exact path={`${match.path}/resource`} component={ResourcesList} />
        <Route exact path={`${match.path}/work`} component={WorksList} />
        <Route render={() => home} />
      </Switch>
    </>
  );
};

export default CatalogerView;
