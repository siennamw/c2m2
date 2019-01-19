import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productionCompanyValidationSchema } from '../../../validationSchemas';

const InnerProductionCompanyForm = ({ handleSubmit, isSubmitting, status }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='description'>
        Contact Information <ErrorMessage name='description'
                                          component='div'
                                          className='form-message error'/>
      </label>
      <Field type='text'
             name='description'
             className='u-full-width'
             component='textarea'/>
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Submit
      </button>
      {
        status
        ? <div className={`form-message api-message ${status.type}`}>{status.message}</div>
        : undefined
      }
    </Form>
  )
};

const ProductionCompanyForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(productionCompanyValidationSchema.fields).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerProductionCompanyForm}
    />
  )
};

export default ProductionCompanyForm;
