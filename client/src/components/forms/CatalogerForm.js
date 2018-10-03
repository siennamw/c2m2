import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required')
});

const InnerCatalogerForm = ({ handleSubmit, isSubmitting }) => {
  return (
    <Form>
      <ErrorMessage name='name' component='div' className='form-error' />
      <Field type='text'
             name='name'
             placeholder='first and last name'
             className='u-full-width'/>
      <ErrorMessage name='email' component='div' className='form-error' />
      <Field type='email'
             name='email'
             placeholder='email'
             className='u-full-width'/>
      <ErrorMessage name='description' component='div' className='form-error' />
      <Field type='text'
             name='description'
             placeholder='description'
             className='u-full-width'/>
      <ErrorMessage name='password' component='div' className='form-error' />
      <Field type='password'
             name='password'
             autoComplete='new-password'
             placeholder='password'
             className='u-full-width'/>
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Submit
      </button>
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
