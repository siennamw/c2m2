import React, { useState } from 'react';

import { StyledSelect } from './entries/SelectField';
import { MODEL_NAMES } from '../constants';

import SearchWorks from './entries/work/SearchWorks';
import SearchComposers from './entries/composer/SearchComposers';
import SearchCollections from './entries/collection/SearchCollections';
import SearchCountries from './entries/country/SearchCountries';
import SearchDirectors from './entries/director/SearchDirectors';
import SearchProductionCompanies from './entries/productionCompany/SearchProductionCompanies';
import SearchRepositories from './entries/repository/SearchRepositories';
import SearchAdvanced from './entries/SearchAdvanced';

const BasicSearch = () => {
  const models = MODEL_NAMES
    .filter((model) => (
      model !== 'cataloger'
      && model !== 'material_format'
      && model !== 'media_type'
      && model !== 'resource'
    ))
    .map((model) => ({
      label: model.replace('_', ' '),
      value: model,
    }));

  const [selectedModel, setSelectedModel] = useState({ value: '', label: 'Select...' });

  const getComponentForModelSearch = () => {
    switch (selectedModel.value) {
      case 'collection':
        return <SearchCollections />;
      case 'composer':
        return <SearchComposers />;
      case 'country':
        return <SearchCountries />;
      case 'director':
        return <SearchDirectors />;
      case 'production_company':
        return <SearchProductionCompanies />;
      case 'repository':
        return <SearchRepositories />;
      case 'work':
        return <SearchWorks />;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>Simple Search</h2>
      <p>Select an entry type to search by title or name.</p>
      <form>
        <label htmlFor="entryType">
          Select Entry Type
          <StyledSelect
            fieldName="entryType"
            id="entryType"
            onBlur={() => {}}
            onChange={(value) => setSelectedModel(value)}
            options={models}
            value={selectedModel}
          />
        </label>
      </form>
      { getComponentForModelSearch() }
      <h2>Advanced Search</h2>
      <p>Search for a specific work with more information.</p>
      <SearchAdvanced />
    </div>
  );
};

export default BasicSearch;
