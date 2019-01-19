import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { composerValidationSchema } from '../../../validationSchemas';

const InnerComposerForm = ({ handleSubmit, isSubmitting, status }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='imdb_link'>
        IMDB Link <ErrorMessage name='imdb_link' component='div' className='form-message error'/>
      </label>
      <Field type='url'
             name='imdb_link'
             className='u-full-width'/>
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

const ComposerForm = ({ mutation, handleSubmit, validationSchema }) => {
  const initialValues = Object.keys(composerValidationSchema.fields).reduce((acc, item) => {
    acc[item] = '';
    return acc;
  }, {});

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)}
      render={InnerComposerForm}
    />
  )
};

export default ComposerForm;
