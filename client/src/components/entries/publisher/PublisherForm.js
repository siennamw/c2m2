import React from 'react';
import { Form } from 'formik';
import InputField from '../InputField';

const PublisherForm = ({ handleSubmit, isSubmitting, isValid, status }) => (
  <Form>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="Contact Information" fieldName="contact_info" />
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
