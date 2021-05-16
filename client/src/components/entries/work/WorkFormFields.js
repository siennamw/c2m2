import React, { Fragment } from 'react';
import { useFormikContext } from 'formik';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import InputField from '../InputField';

import * as queries from '../../../queries';
import { reactSelectOnChange } from '../../../utils';

import ComposerForm from '../composer/ComposerForm';
import CountryForm from '../country/CountryForm';
import DirectorForm from '../director/DirectorForm';
import ProductionCompanyForm from '../productionCompany/ProductionCompanyForm';

const WorkFormFields = () => {
  const {
    setFieldTouched,
    setFieldValue,
    values,
  } = useFormikContext();
  const model = 'work';

  const selectOnBlur = (field) => {
    setFieldTouched(field, true);
  };

  const selectOnChange = (evt, name) => {
    reactSelectOnChange(evt, name, setFieldValue);
  };

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
        componentForModal={CountryForm}
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
        componentForModal={ComposerForm}
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
        componentForModal={ComposerForm}
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
        componentForModal={DirectorForm}
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
        componentForModal={ProductionCompanyForm}
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

export default WorkFormFields;
