import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { publisherValidationSchema } from '../../../validationSchemas';

const InnerPublisherForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <label htmlFor="contact_info">
      Contact Information
      <ErrorMessage
        name="contact_info"
        component="div"
        className="status-message form-message error"
      />
      <Field
        type="text"
        name="contact_info"
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
        ? <div className={`status-message ${status.type}`}>{status.message}</div>
        : undefined
    }
  </Form>
);

const PublisherForm = ({ handleSubmit, initialValues, mutation, validationSchema }) => {
  const vals = initialValues
    || Object.keys(publisherValidationSchema.fields).reduce((acc, item) => {
      acc[item] = item.includes('ids') ? [] : '';
      return acc;
    }, {});

  return (
    <Formik
      initialValues={vals}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
        handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)
      )}
      render={InnerPublisherForm}
    />
  );
};

export default PublisherForm;
