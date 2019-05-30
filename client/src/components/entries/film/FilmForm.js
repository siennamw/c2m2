import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import InputField from '../InputField';

import * as queries from '../../../queries';

import NewComposer from '../composer/NewComposer';
import NewCountry from '../country/NewCountry';
import NewDirector from '../director/NewDirector';
import NewMediaType from '../mediaType/NewMediaType';
import NewProductionCompany from '../productionCompany/NewProductionCompany';

const FilmForm = ({ selfIsAdmin, setFieldValue }) => {
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
      <InputField displayName="Title" fieldName="title" />
      <InputField displayName="Secondary Title" fieldName="secondary_title" />
      <InputField displayName="Alias or Alternate Title(s)" fieldName="alias_alternates" />
      <InputField displayName="IMDB Link" fieldName="imdb_link" fieldType="url" />
      <InputField displayName="Year" fieldName="year" fieldType="number" />
      <SelectFieldWithQuery
        displayName="Country"
        fieldName="country_id"
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_COUNTRIES}
        queryName="allCountries"
        componentForModal={<NewCountry />}
      />
      <SelectFieldWithQuery
        displayName="Media Type"
        fieldName="media_type_id"
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_MEDIA_TYPES}
        queryName="allMediaTypes"
        componentForModal={<NewMediaType />}
      />
      <SelectFieldWithQuery
        displayName="Composer(s)"
        fieldName="composer_ids"
        isMulti
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_COMPOSERS}
        queryName="allComposers"
        componentForModal={<NewComposer />}
      />
      <SelectFieldWithQuery
        displayName="Orchestrator(s)"
        fieldName="orchestrator_ids"
        isMulti
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_COMPOSERS}
        queryName="allComposers"
        componentForModal={<NewComposer />}
      />
      <SelectFieldWithQuery
        displayName="Director(s)"
        fieldName="director_ids"
        isMulti
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_DIRECTORS}
        queryName="allDirectors"
        componentForModal={<NewDirector />}
      />
      <SelectFieldWithQuery
        displayName="Production Company or Companies"
        fieldName="production_company_ids"
        isMulti
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_PRODUCTION_COMPANIES}
        queryName="allProductionCompanies"
        componentForModal={<NewProductionCompany />}
      />
    </Fragment>
  );
};

FilmForm.defaultProps = {
  selfIsAdmin: false,
};

FilmForm.propTypes = {
  selfIsAdmin: PropTypes.bool,
};

export default FilmForm;
