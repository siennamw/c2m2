import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { repositoryValidationSchema, workValidationSchema } from '../../../validationSchemas';

const InnerRepositoryForm = ({ handleSubmit, isSubmitting, status }) => (
  <Form>
    <label htmlFor="name">
      Name
      <ErrorMessage name="name" component="div" className="status-message form-message error" />
      <Field
        type="text"
        name="name"
        className="u-full-width"
      />
    </label>
    <label htmlFor="location">
      Location
      <ErrorMessage name="location" component="div" className="status-message form-message error" />
      <Field
        type="text"
        name="location"
        className="u-full-width"
      />
    </label>
    <label htmlFor="website">
      Website
      <ErrorMessage name="website" component="div" className="status-message form-message error" />
      <Field
        type="url"
        name="website"
        className="u-full-width"
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
        ? <div className={`status-message ${status.type}`}>{status.message}</div>
        : undefined
    }
  </Form>
);

const RepositoryForm = ({ handleSubmit, initialValues, mutation, validationSchema }) => {
  const vals = initialValues
    || Object.keys(workValidationSchema.fields).reduce((acc, item) => {
      acc[item] = item.includes('ids') ? [] : '';
      return acc;
    }, {});

  return (
    <Formik
      initialValues={vals}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerRepositoryForm}
    />
  );
};

export default RepositoryForm;
