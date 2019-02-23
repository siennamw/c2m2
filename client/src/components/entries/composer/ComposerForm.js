import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { composerValidationSchema } from '../../../validationSchemas';

const InnerComposerForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <label htmlFor="imdb_link">
      IMDB Link
      <ErrorMessage name="imdb_link" component="div" className="status-message form-message error" />
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
        ? <div className={`status-message ${status.type}`}>{status.message}</div>
        : undefined
    }
  </Form>
);

const ComposerForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(composerValidationSchema.fields).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerComposerForm}
    />
  );
};

export default ComposerForm;
