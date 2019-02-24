import React from 'react';
import {
  Form, Field, ErrorMessage,
} from 'formik';

const RepositoryForm = ({ handleSubmit, isSubmitting, isValid, status }) => (
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
      disabled={isSubmitting || !isValid}
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

export default RepositoryForm;
