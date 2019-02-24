import React from 'react';
import {
  Form, Field, ErrorMessage,
} from 'formik';

const PublisherForm = ({ handleSubmit, isSubmitting, isValid, status }) => (
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

export default PublisherForm;
