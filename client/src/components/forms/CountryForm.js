import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const InnerCountryForm = ({ handleSubmit, isSubmitting, status }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='description'>
        Description <ErrorMessage name='description' component='div'
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
        status ?
        <div className={`form-message api-message ${status.type}`}>{status.message}</div> :
        undefined
      }
    </Form>
  )
};

const CountryForm = ({ mutation, handleSubmit, validationSchema }) => (
  <Formik
    initialValues={{
      name: '',
      description: '',
    }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
    render={InnerCountryForm}
  />
);

export default CountryForm;
