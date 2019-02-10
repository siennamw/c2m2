import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { publisherValidationSchema } from '../../../validationSchemas';

const InnerPublisherForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <label htmlFor="description">
      Contact Information
      <ErrorMessage
        name="description"
        component="div"
        className="form-message error"
      />
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

const PublisherForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(publisherValidationSchema.fields).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerPublisherForm}
    />
  );
};

export default PublisherForm;
