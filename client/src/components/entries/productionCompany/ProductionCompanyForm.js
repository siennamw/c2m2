import React from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { productionCompanyValidationSchema } from '../../../validationSchemas';

const InnerProductionCompanyForm = ({ handleSubmit, isSubmitting, status }) => (
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

const ProductionCompanyForm = ({ handleSubmit, initialValues, mutation, validationSchema }) => {
  const vals = initialValues
    || Object.keys(productionCompanyValidationSchema.fields).reduce((acc, item) => {
      acc[item] = '';
      return acc;
    }, {});

  return (
    <Formik
      initialValues={vals}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
        handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)
      )}
      render={InnerProductionCompanyForm}
    />
  );
};

export default ProductionCompanyForm;
