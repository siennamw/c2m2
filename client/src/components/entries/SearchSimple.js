import React, { useState } from 'react';

import { StyledSelect } from './SelectField';
import { MODEL_NAMES } from '../../constants';

import SearchCollections from './collection/SearchCollections';
import SearchComposers from './composer/SearchComposers';
import SearchCountries from './country/SearchCountries';
import SearchDirectors from './director/SearchDirectors';
import SearchProductionCompanies from './productionCompany/SearchProductionCompanies';
import SearchRepositories from './repository/SearchRepositories';
import SearchWorks from './work/SearchWorks';

const BasicSearch = () => {
  const models = MODEL_NAMES
    .filter((model) => (
      model !== 'cataloger'
      && model !== 'material_format'
      && model !== 'media_type'
      && model !== 'resource'
    ))
    .map((model) => ({
      label: model === 'composer'
        ? 'composer/orchestrator'
        : model.replace('_', ' '),
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
    </div>
  );
};

export default BasicSearch;
