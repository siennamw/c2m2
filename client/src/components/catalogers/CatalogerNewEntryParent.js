import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import NewCataloger from '../entries/cataloger/NewCataloger';
import NewCollection from '../entries/collection/NewCollection';
import NewComposer from '../entries/composer/NewComposer';
import NewCountry from '../entries/country/NewCountry';
import NewDirector from '../entries/director/NewDirector';
import NewFilm from '../entries/film/NewFilm';
import NewMaterialFormat from '../entries/materialFormat/NewMaterialFormat';
import NewMediaType from '../entries/mediaType/NewMediaType';
import NewProductionCompany from '../entries/productionCompany/NewProductionCompany';
import NewPublisher from '../entries/publisher/NewPublisher';
import NewRepository from '../entries/repository/NewRepository';
import NewWork from '../entries/work/NewWork';

const CatalogerNewEntryParent = ({ match }) => (
  <div>
    {
      // add back arrow to root path for all but root path
      match.path !== window.location.pathname
        ? <Link to={`${match.path}`}>&larr; Back</Link>
        : undefined
    }
    <Switch>
      <Route exact path={`${match.path}/cataloger`} component={NewCataloger} />
      <Route exact path={`${match.path}/collection`} component={NewCollection} />
      <Route exact path={`${match.path}/composer`} component={NewComposer} />
      <Route exact path={`${match.path}/country`} component={NewCountry} />
      <Route exact path={`${match.path}/director`} component={NewDirector} />
      <Route exact path={`${match.path}/film`} component={NewFilm} />
      <Route exact path={`${match.path}/material_format`} component={NewMaterialFormat} />
      <Route exact path={`${match.path}/media_type`} component={NewMediaType} />
      <Route exact path={`${match.path}/production_company`} component={NewProductionCompany} />
      <Route exact path={`${match.path}/publisher`} component={NewPublisher} />
      <Route exact path={`${match.path}/repository`} component={NewRepository} />
      <Route exact path={`${match.path}/work`} component={NewWork} />
      <Route render={() => (
        <div>
          <h3>Create a New Entry</h3>
          <p>Select the type of entry you would like to create from the list below.</p>
          <div className="row">
            <div className="six columns">
              <ul className="no-margin">
                <li><Link to={`${match.path}/cataloger`}>Cataloger</Link></li>
                <li><Link to={`${match.path}/collection`}>Collection</Link></li>
                <li><Link to={`${match.path}/composer`}>Composer</Link></li>
                <li><Link to={`${match.path}/country`}>Country</Link></li>
                <li><Link to={`${match.path}/director`}>Director</Link></li>
                <li><Link to={`${match.path}/film`}>Film</Link></li>
              </ul>
            </div>
            <div className="six columns">
              <ul>
                <li><Link to={`${match.path}/material_format`}>Material Format</Link></li>
                <li><Link to={`${match.path}/media_type`}>Media Type</Link></li>
                <li><Link to={`${match.path}/production_company`}>Production Company</Link></li>
                <li><Link to={`${match.path}/publisher`}>Publisher</Link></li>
                <li><Link to={`${match.path}/repository`}>Repository</Link></li>
                <li><Link to={`${match.path}/work`}>Work</Link></li>
              </ul>
            </div>
          </div>
        </div>
      )}
      />
    </Switch>
  </div>
);

export default CatalogerNewEntryParent;
