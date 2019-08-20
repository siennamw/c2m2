import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import InputField from '../InputField';

import * as queries from '../../../queries';

import NewComposer from '../composer/NewComposer';
import NewCountry from '../country/NewCountry';
import NewDirector from '../director/NewDirector';
import NewProductionCompany from '../productionCompany/NewProductionCompany';

const WorkForm = ({ selfIsAdmin, setFieldValue }) => {
  const model = 'work';

  const selectOnChange = (evt, name) => {
    if (name.includes('_ids')) {
      // when selecting from a multiselect to set an array of IDs,
      // build array manually
      setFieldValue(
        name,
        // turn array-like object into a real array
        [].slice
          .call(evt.target.selectedOptions)
          .map(option => option.value),
      );
    } else {
      setFieldValue(
        name,
        evt.target.value,
      );
    }
  };

  const pubStatusOptions = [
    { id: 'draft', name: 'draft' },
    { id: 'provisional', name: 'provisional' },
  ];

  if (selfIsAdmin) pubStatusOptions.push({ id: 'approved', name: 'approved' });

  return (
    <Fragment>
      <InputField
        displayName="Title"
        fieldName="title"
        modelName={model}
      />
      <InputField
        displayName="Secondary Title"
        fieldName="secondary_title"
        modelName={model}
      />
      <InputField
        displayName="Alias or Alternate Title(s)"
        fieldName="alias_alternates"
        modelName={model}
      />
      <InputField
        displayName="IMDB Link"
        fieldName="imdb_link"
        fieldType="url"
        modelName={model}
      />
      <InputField
        displayName="Year"
        fieldName="year"
        fieldType="number"
        modelName={model}
      />
      <SelectFieldWithQuery
        componentForModal={<NewCountry />}
        displayName="Country"
        fieldName="country_id"
        modelName={model}
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_COUNTRIES}
        queryName="allCountries"
      />
      <SelectFieldWithQuery
        disableAddButton
        displayName="Media Type"
        fieldName="media_type_id"
        modelName={model}
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_MEDIA_TYPES}
        queryName="allMediaTypes"
      />
      <SelectFieldWithQuery
        componentForModal={<NewComposer />}
        displayName="Composer(s)"
        fieldName="composer_ids"
        isMulti
        modelName={model}
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_COMPOSERS}
        queryName="allComposers"
      />
      <SelectFieldWithQuery
        componentForModal={<NewComposer />}
        displayName="Orchestrator(s)"
        fieldName="orchestrator_ids"
        isMulti
        modelName={model}
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_COMPOSERS}
        queryName="allComposers"
      />
      <SelectFieldWithQuery
        componentForModal={<NewDirector />}
        displayName="Director(s)"
        fieldName="director_ids"
        isMulti
        modelName={model}
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_DIRECTORS}
        queryName="allDirectors"
      />
      <SelectFieldWithQuery
        componentForModal={<NewProductionCompany />}
        displayName="Production Company or Companies"
        fieldName="production_company_ids"
        isMulti
        modelName={model}
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_PRODUCTION_COMPANIES}
        queryName="allProductionCompanies"
      />
    </Fragment>
  );
};

WorkForm.defaultProps = {
  selfIsAdmin: false,
};

WorkForm.propTypes = {
  selfIsAdmin: PropTypes.bool,
};

export default WorkForm;
