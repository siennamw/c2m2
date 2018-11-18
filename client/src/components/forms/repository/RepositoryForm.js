import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const InnerRepositoryForm = ({ handleSubmit, isSubmitting, status }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='location'>
        Location <ErrorMessage name='location' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='location'
             className='u-full-width'/>
      <label htmlFor='website'>
        Website <ErrorMessage name='website' component='div' className='form-message error'/>
      </label>
      <Field type='url'
             name='website'
             className='u-full-width'/>
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

const RepositoryForm = ({ mutation, handleSubmit, validationSchema }) => (
  <Formik
    initialValues={{
      name: '',
      location: '',
      website: '',
    }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
    render={InnerRepositoryForm}
  />
);

export default RepositoryForm;
