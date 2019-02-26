import React from 'react';
import { Form } from 'formik';
import InputField from '../InputField';

const CatalogerForm = ({ handleSubmit, isSubmitting, isValid, status }) => (
  <Form>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="Email" fieldName="email" fieldType="email" />
    <InputField displayName="Description" fieldName="description" />
    <InputField displayName="Password" fieldName="password" fieldType="password" />
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

export default CatalogerForm;
