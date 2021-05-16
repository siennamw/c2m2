import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import { AuthContext } from '../AuthContext';

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

const CatalogerNewEntryParent = ({ match }) => {
  const location = useLocation();
  const { admin } = useContext(AuthContext);

  return (
    <div>
      {
        // add back arrow to root path for all but root path
        match.path !== location.pathname
          ? <Link to={`${match.path}`}>&larr; Back</Link>
          : null
      }
      <Switch>
        <Route exact path={`${match.path}/cataloger`} component={CatalogerForm} />
        <Route exact path={`${match.path}/collection`} component={CollectionForm} />
        <Route exact path={`${match.path}/composer`} component={ComposerForm} />
        <Route exact path={`${match.path}/country`} component={CountryForm} />
        <Route exact path={`${match.path}/director`} component={DirectorForm} />
        <Route exact path={`${match.path}/material_format`} component={MaterialFormatForm} />
        <Route exact path={`${match.path}/media_type`} component={MediaTypeForm} />
        <Route exact path={`${match.path}/production_company`} component={ProductionCompanyForm} />
        <Route exact path={`${match.path}/repository`} component={RepositoryForm} />
        <Route exact path={`${match.path}/resource`} component={ResourceForm} />
        <Route exact path={`${match.path}/work`} component={WorkForm} />
        <Route
          render={() => (
            <div>
              <h3>Create a New Entry</h3>
              <p>Select the type of entry you would like to create from the list below.</p>
              <h4>Principal Entries</h4>
              <p>
                Principal entries are detailed records that form the substance of
                this catalog. They are associated with smaller, supporting
                entries (ex. director, composer, production company) which may be
                easily selected or added as a principal entry is created.
              </p>
              <ul>
                <li>
                  <Link to={`${match.path}/work`}>Work</Link>
                  &nbsp;
                  - the overall work (ex. film, series, game) with which a musical
                  score is associated
                </li>
                <li>
                  <Link to={`${match.path}/resource`}>Resource</Link>
                  &nbsp;
                  - an individual library holding (ex. score, recording, etc.),
                  within a collection, pertaining to a film, series, game, etc.
                </li>
              </ul>
              <h4>Supporting Entries</h4>
              <p>
                Supporting entries are small records with which one or many principal
                entries are associated. These entries can be easily created while
                creating a principal entry, but may also be created individually by
                clicking the type below.
              </p>
              <div className="row">
                <div className="six columns">
                  <ul className="no-margin">
                    <li><Link to={`${match.path}/collection`}>Collection</Link></li>
                    <li><Link to={`${match.path}/composer`}>Composer</Link></li>
                    <li><Link to={`${match.path}/country`}>Country</Link></li>
                  </ul>
                </div>
                <div className="six columns">
                  <ul>
                    <li><Link to={`${match.path}/director`}>Director</Link></li>
                    <li><Link to={`${match.path}/production_company`}>Production Company</Link></li>
                    <li><Link to={`${match.path}/repository`}>Repository</Link></li>
                  </ul>
                </div>
              </div>
              {
                admin
                  ? (
                    <div>
                      <h4>Administrator-Only Supporting Entries</h4>
                      <p>These entry types can only be created by administrators.</p>
                      <ul>
                        <li>
                          <Link to={`${match.path}/cataloger`}>Cataloger</Link>
                        </li>
                        <li>
                          <Link to={`${match.path}/material_format`}>Material Format</Link>
                        </li>
                        <li>
                          <Link to={`${match.path}/media_type`}>Media Type</Link>
                        </li>
                      </ul>
                    </div>
                  )
                  : null
              }
            </div>
          )}
        />
      </Switch>
    </div>
  );
};

CatalogerNewEntryParent.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default CatalogerNewEntryParent;
