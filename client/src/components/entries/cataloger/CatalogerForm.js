import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { catalogerValidationSchema } from '../../../validationSchemas';

const InnerCatalogerForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <label htmlFor="email">
      Email
      <ErrorMessage name="email" component="div" className="status-message form-message error" />
      <Field
        type="email"
        name="email"
        className="u-full-width"
      />
    </label>
    <label htmlFor="description">
      Description
      <ErrorMessage name="description" component="div" className="status-message form-message error" />
      <Field
        type="text"
        name="description"
        className="u-full-width"
        component="textarea"
      />
    </label>
    <label htmlFor="password">
      Password
      <ErrorMessage name="password" component="div" className="status-message form-message error" />
      <Field
        type="password"
        name="password"
        autoComplete="new-password"
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

const CatalogerForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(catalogerValidationSchema.fields).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerCatalogerForm}
    />
  );
};

export default CatalogerForm;
