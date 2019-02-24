import React from 'react';
import {
  Form, Field, ErrorMessage,
} from 'formik';

const MaterialFormatForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <label htmlFor="description">
      Description
      <ErrorMessage
        name="description"
        component="div"
        className="status-message form-message error"
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
        ? <div className={`status-mnessage ${status.type}`}>{status.message}</div>
        : undefined
    }
  </Form>
);

export default MaterialFormatForm;
