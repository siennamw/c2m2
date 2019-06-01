import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import InputField from '../InputField';

import * as queries from '../../../queries';

import NewCollection from '../collection/NewCollection';
import NewComposer from '../composer/NewComposer';
import NewCountry from '../country/NewCountry';
import NewDirector from '../director/NewDirector';
import NewFilm from '../film/NewFilm';
import NewMaterialFormat from '../materialFormat/NewMaterialFormat';
import NewMediaType from '../mediaType/NewMediaType';
import NewProductionCompany from '../productionCompany/NewProductionCompany';
import NewPublisher from '../publisher/NewPublisher';
import SelectField from '../SelectField';

const WorkForm = ({ selfIsAdmin, setFieldValue }) => {
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
      <SelectFieldWithQuery
        displayName="Film"
        fieldName="film_id"
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_FILMS}
        queryName="allFilms"
        componentForModal={<NewFilm />}
      />
      <InputField displayName="Title" fieldName="title" />
      <InputField displayName="Secondary Title" fieldName="secondary_title" />
      <InputField displayName="Alias or Alternate Title(s)" fieldName="alias_alternates" />
      <InputField displayName="Year" fieldName="year" fieldType="number" />
      <InputField displayName="Finding Aid Link" fieldName="finding_aid_link" fieldType="url" />
      <InputField displayName="Digital Copy Link" fieldName="digital_copy_link" fieldType="url" />
      <InputField displayName="Citation Source" fieldName="citation_source" />
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
        displayName="Material Format"
        fieldName="material_format_id"
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_MATERIAL_FORMATS}
        queryName="allMaterialFormats"
        componentForModal={<NewMaterialFormat />}
      />
      <SelectFieldWithQuery
        displayName="Collection(s)"
        fieldName="collection_ids"
        isMulti
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_COLLECTIONS}
        queryName="allCollections"
        componentForModal={<NewCollection />}
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
      <SelectFieldWithQuery
        displayName="Publisher(s)"
        fieldName="publisher_ids"
        isMulti
        onChangeCallback={selectOnChange}
        query={queries.LIST_ALL_PUBLISHERS}
        queryName="allPublishers"
        componentForModal={<NewPublisher />}
      />
      <InputField displayName="Cataloging Notes" fieldName="cataloging_notes" />
      <SelectField
        onChangeCallback={selectOnChange}
        fieldName="publication_status"
        disablePlaceholder
        displayName="Publication Status"
        options={pubStatusOptions}
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
