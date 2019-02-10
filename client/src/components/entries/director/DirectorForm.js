import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { directorValidationSchema } from '../../../validationSchemas';

const InnerDirectorForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <label htmlFor="imdb_link">
      IMDB Link
      <ErrorMessage name="imdb_link" component="div" className="form-message error" />
      <Field
        type="url"
        name="imdb_link"
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
        ? <div className={`form-message api-message ${status.type}`}>{status.message}</div>
        : undefined
    }
  </Form>
);

const DirectorForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(directorValidationSchema.fields).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerDirectorForm}
    />
  );
};

export default DirectorForm;
