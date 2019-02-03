import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import { workValidationSchema } from '../../../validationSchemas';
import MultiSelectFieldWithQuery from '../MultiSelectFieldWithQuery';
import * as queries from '../../../queries';

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
       Title <ErrorMessage name="title" component="div" className="form-message error" />
      </label>
      <Field
        type="text"
        name="title"
        className="u-full-width"
      />
      <label htmlFor="secondary_title">
        Secondary Title <ErrorMessage name="secondary_title" component="div" className="form-message error" />
      </label>
      <Field
        type="text"
        name="secondary_title"
        className="u-full-width"
      />
      <label htmlFor="alias_alternates">
        Alias or Alternate Title(s) <ErrorMessage name="alias_alternates" component="div" className="form-message error" />
      </label>
      <Field
        type="text"
        name="alias_alternates"
        className="u-full-width"
      />
      <label htmlFor="year">
        Year <ErrorMessage name="year" component="div" className="form-message error" />
      </label>
      <Field
        type="number"
        min="1900"
        name="year"
        className="u-full-width"
      />
      <label htmlFor="finding_aid_link">
        Finding Aid Link <ErrorMessage name="finding_aid_link" component="div" className="form-message error" />
      </label>
      <Field
        type="url"
        name="finding_aid_link"
        className="u-full-width"
      />
      <label htmlFor="digital_copy_link">
        Digital Copy Link <ErrorMessage name="digital_copy_link" component="div" className="form-message error" />
      </label>
      <Field
        type="url"
        name="digital_copy_link"
        className="u-full-width"
      />
      <label htmlFor="rights_holder">
        Rights Holder <ErrorMessage name="rights_holder" component="div" className="form-message error" />
      </label>
      <Field
        type="text"
        name="rights_holder"
        className="u-full-width"
      />
      <label htmlFor="citation_source">
        Citation Source <ErrorMessage name="citation_source" component="div" className="form-message error" />
      </label>
      <Field
        type="text"
        name="citation_source"
        className="u-full-width"
      />
      <label htmlFor="country_id">
        Country ID <ErrorMessage name="country_id" component="div" className="form-message error" />
      </label>
      <Field
        name="country_id"
        className="u-full-width"
        component="select"
      >
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>
      <label htmlFor="media_type_id">
        Media Type ID <ErrorMessage name="media_type_id" component="div" className="form-message error" />
      </label>
      <Field
        name="media_type_id"
        className="u-full-width"
        component="select"
      >
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>
      <label htmlFor="material_format_id">
        Material Format ID <ErrorMessage name="material_format_id" component="div" className="form-message error" />
      </label>
      <Field
        name="material_format_id"
        className="u-full-width"
        component="select"
      >
        <option value="">Select</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>
      <MultiSelectFieldWithQuery
        displayName="Collection(s)"
        fieldName="collection_ids"
        multiSelectOnChange={multiSelectOnChange}
        query={queries.LIST_ALL_COLLECTIONS}
        queryName="allCollections"
      />
      <label htmlFor="composer_ids">
        Composer IDs <ErrorMessage name="composer_ids" component="div" className="form-message error" />
      </label>
      <Field
        name="composer_ids"
        className="u-full-width"
        component="select"
        multiple
        onChange={evt => multiSelectOnChange(evt, 'composer_ids')}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>
      <label htmlFor="director_ids">
        Director IDs <ErrorMessage name="director_ids" component="div" className="form-message error" />
      </label>
      <Field
        name="director_ids"
        className="u-full-width"
        component="select"
        multiple
        onChange={evt => multiSelectOnChange(evt, 'director_ids')}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>
      <label htmlFor="production_company_ids">
        Production Company IDs <ErrorMessage name="production_company_ids" component="div" className="form-message error" />
      </label>
      <Field
        name="production_company_ids"
        className="u-full-width"
        component="select"
        multiple
        onChange={evt => multiSelectOnChange(evt, 'production_company_ids')}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>
      <label htmlFor="publisher_ids">
        Publisher IDs <ErrorMessage name="publisher_ids" component="div" className="form-message error" />
      </label>
      <Field
        name="publisher_ids"
        className="u-full-width"
        component="select"
        multiple
        onChange={evt => multiSelectOnChange(evt, 'publisher_ids')}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Field>
      <label htmlFor="cataloging_notes">
        Cataloging Notes <ErrorMessage name="cataloging_notes" component="div" className="form-message error" />
      </label>
      <Field
        type="text"
        name="cataloging_notes"
        className="u-full-width"
        component="textarea"
      />
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
