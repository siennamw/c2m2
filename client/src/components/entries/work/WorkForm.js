import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import { workValidationSchema } from '../../../validationSchemas';
import SelectFieldWithQuery from '../SelectFieldWithQuery';
import * as queries from '../../../queries';

import NewCollection from '../collection/NewCollection';
import NewComposer from '../composer/NewComposer';
import NewCountry from '../country/NewCountry';
import NewDirector from '../director/NewDirector';
import NewMaterialFormat from "../materialFormat/NewMaterialFormat";
import NewMediaType from "../mediaType/NewMediaType";
import NewProductionCompany from "../productionCompany/NewProductionCompany";
import NewPublisher from "../publisher/NewPublisher";

const InnerWorkForm = ({
  handleSubmit, isSubmitting, status, setFieldValue,
}) => {
  const selectOnChange = (evt, name) => {
    // when selecting from a dropdown to set an ID,
    // coerce value to number on change
    if (name.includes('_id')) {
      setFieldValue(
        name,
        Number(evt.target.value),
      );
    }
  };
  const multiSelectOnChange = (evt, name) => {
    // when selecting from a multiselect to set an array of IDs,
    // build array manually & coerce values to numbers on change
    if (name.includes('_ids')) {
      setFieldValue(
        name,
        // turn array-like object into a real array
        [].slice
          .call(evt.target.selectedOptions)
          .map(option => Number(option.value)),
      );
    }
  };

  return (
    <Form>
      <label htmlFor="title">
       Title
        <ErrorMessage name="title" component="div" className="form-message error" />
        <Field
          type="text"
          name="title"
          className="u-full-width"
        />
      </label>
      <label htmlFor="secondary_title">
        Secondary Title
        <ErrorMessage name="secondary_title" component="div" className="form-message error" />
        <Field
          type="text"
          name="secondary_title"
          className="u-full-width"
        />
      </label>
      <label htmlFor="alias_alternates">
        Alias or Alternate Title(s)
        <ErrorMessage name="alias_alternates" component="div" className="form-message error" />
        <Field
          type="text"
          name="alias_alternates"
          className="u-full-width"
        />
      </label>
      <label htmlFor="year">
        Year
        <ErrorMessage name="year" component="div" className="form-message error" />
        <Field
          type="number"
          min="1900"
          name="year"
          className="u-full-width"
        />
      </label>
      <label htmlFor="finding_aid_link">
        Finding Aid Link
        <ErrorMessage name="finding_aid_link" component="div" className="form-message error" />
        <Field
          type="url"
          name="finding_aid_link"
          className="u-full-width"
        />
      </label>
      <label htmlFor="digital_copy_link">
        Digital Copy Link
        <ErrorMessage name="digital_copy_link" component="div" className="form-message error" />
        <Field
          type="url"
          name="digital_copy_link"
          className="u-full-width"
        />
      </label>
      <label htmlFor="rights_holder">
        Rights Holder
        <ErrorMessage name="rights_holder" component="div" className="form-message error" />
        <Field
          type="text"
          name="rights_holder"
          className="u-full-width"
        />
      </label>
      <label htmlFor="citation_source">
        Citation Source
        <ErrorMessage name="citation_source" component="div" className="form-message error" />
        <Field
          type="text"
          name="citation_source"
          className="u-full-width"
        />
      </label>
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
        onChangeCallback={multiSelectOnChange}
        query={queries.LIST_ALL_COLLECTIONS}
        queryName="allCollections"
        componentForModal={<NewCollection />}
      />
      <SelectFieldWithQuery
        displayName="Composer(s)"
        fieldName="composer_ids"
        isMulti
        onChangeCallback={multiSelectOnChange}
        query={queries.LIST_ALL_COMPOSERS}
        queryName="allComposers"
        componentForModal={<NewComposer />}
      />
      <SelectFieldWithQuery
        displayName="Director(s)"
        fieldName="director_ids"
        isMulti
        onChangeCallback={multiSelectOnChange}
        query={queries.LIST_ALL_DIRECTORS}
        queryName="allDirectors"
        componentForModal={<NewDirector />}
      />
      <SelectFieldWithQuery
        displayName="Production Company or Companies"
        fieldName="production_company_ids"
        isMulti
        onChangeCallback={multiSelectOnChange}
        query={queries.LIST_ALL_PRODUCTION_COMPANIES}
        queryName="allProductionCompanies"
        componentForModal={<NewProductionCompany />}
      />
      <SelectFieldWithQuery
        displayName="Publisher(s)"
        fieldName="publisher_ids"
        isMulti
        onChangeCallback={multiSelectOnChange}
        query={queries.LIST_ALL_PUBLISHERS}
        queryName="allPublishers"
        componentForModal={<NewPublisher />}
      />
      <label htmlFor="cataloging_notes">
        Cataloging Notes
        <ErrorMessage name="cataloging_notes" component="div" className="form-message error" />
        <Field
          type="text"
          name="cataloging_notes"
          className="u-full-width"
          component="textarea"
        />
      </label>
      <button
        type="submit"
        className="button-primary u-full-width"
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        Submit
      </button>
      {
        status
          ? <div className={`form-message api-message ${status.type}`}>{status.message}</div>
          : undefined
      }
    </Form>
  );
};

const WorkForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(workValidationSchema.fields).reduce((acc, item) => {
    acc[item] = item.includes('ids') ? [] : '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerWorkForm}
    />
  );
};

export default WorkForm;
