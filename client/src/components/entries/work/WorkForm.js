import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import InputField from '../InputField';

import * as queries from '../../../queries';
import { reactSelectOnChange } from '../../../utils';

import NewComposer from '../composer/NewComposer';
import NewCountry from '../country/NewCountry';
import NewDirector from '../director/NewDirector';
import NewProductionCompany from '../productionCompany/NewProductionCompany';

const WorkForm = ({ selfIsAdmin, setFieldTouched, setFieldValue, values }) => {
  const model = 'work';

  const selectOnBlur = (field) => {
    setFieldTouched(field, true);
  };

  const selectOnChange = (evt, name) => {
    reactSelectOnChange(evt, name, setFieldValue);
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
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_COUNTRIES}
        queryName="allCountries"
        selected={values.country_id}
      />
      <SelectFieldWithQuery
        disableAddButton
        displayName="Media Type"
        fieldName="media_type_id"
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_MEDIA_TYPES}
        queryName="allMediaTypes"
        selected={values.media_type_id}
      />
      <SelectFieldWithQuery
        componentForModal={<NewComposer />}
        displayName="Composer(s)"
        fieldName="composer_ids"
        isMulti
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_COMPOSERS}
        queryName="allComposers"
        selected={values.composer_ids}
      />
      <SelectFieldWithQuery
        componentForModal={<NewComposer />}
        displayName="Orchestrator(s)"
        fieldName="orchestrator_ids"
        isMulti
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_COMPOSERS}
        queryName="allComposers"
        selected={values.orchestrator_ids}
      />
      <SelectFieldWithQuery
        componentForModal={<NewDirector />}
        displayName="Director(s)"
        fieldName="director_ids"
        isMulti
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_DIRECTORS}
        queryName="allDirectors"
        selected={values.director_ids}
      />
      <SelectFieldWithQuery
        componentForModal={<NewProductionCompany />}
        displayName="Production Company or Companies"
        fieldName="production_company_ids"
        isMulti
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_PRODUCTION_COMPANIES}
        queryName="allProductionCompanies"
        selected={values.production_company_ids}
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
