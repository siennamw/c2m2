import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  description: Yup.string(),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required')
});

const InnerCatalogerForm = ({ handleSubmit, isSubmitting, status }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-error' />
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='email'>
        Email <ErrorMessage name='email' component='div' className='form-error' />
      </label>
      <Field type='email'
             name='email'
             className='u-full-width'/>
      <label htmlFor='description'>
        Description <ErrorMessage name='description' component='div' className='form-error' />
      </label>
      <Field type='text'
             name='description'
             className='u-full-width'
             component='textarea'/>
      <label htmlFor='password'>
        Password <ErrorMessage name='password' component='div' className='form-error' />
      </label>
      <Field type='password'
             name='password'
             autoComplete='new-password'
             className='u-full-width'/>
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Submit
      </button>
      {
        status ?
        <div className='form-error api-error'>{status}</div> :
        undefined
      }
    </Form>
  )
};

const CatalogerForm = () => {
  return (
    <div>
      <h3>New Cataloger</h3>
      <Formik
        initialValues={{
          name: '',
          email: '',
          description: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => console.log(values)}
        render={InnerCatalogerForm}
      />
    </div>
  )
};

export default CatalogerForm;
