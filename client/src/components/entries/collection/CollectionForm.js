import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';

import { collectionValidationSchema } from '../../../validationSchemas';
import { LIST_ALL_REPOSITORIES } from '../../../queries';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import NewRepository from '../repository/NewRepository';

const InnerCollectionForm = ({
  handleSubmit, isSubmitting, status, setFieldValue
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

  return (
    <Form>
      <label htmlFor="name">
        Name
        <ErrorMessage name="name" component="div" className="form-message error" />
        <Field
          type="text"
          name="name"
          className="u-full-width"
        />
      </label>
      <SelectFieldWithQuery
        displayName="Repository"
        fieldName="repository_id"
        onChangeCallback={selectOnChange}
        query={LIST_ALL_REPOSITORIES}
        queryName="allRepositories"
        componentForModal={<NewRepository />}
      />
      <label htmlFor="description">
        Description
        <ErrorMessage name="description" component="div" className="form-message error" />
        <Field
          type="text"
          name="description"
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

const CollectionForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(collectionValidationSchema.fields).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
        handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)
      )}
      render={InnerCollectionForm}
    />
  );
};

export default CollectionForm;
