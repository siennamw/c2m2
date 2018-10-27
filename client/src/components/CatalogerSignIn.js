import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required')
});

const CatalogerSignInForm = ({ handleSubmit, isSubmitting }) => {
  return (
    <Form>
      <label htmlFor='email'>
        Email <ErrorMessage name='email' component='div' className='form-error' />
      </label>
      <Field type='email'
             name='email'
             autoComplete='email'
             className='u-full-width'/>
      <label htmlFor='password'>
        Password <ErrorMessage name='password' component='div' className='form-error' />
      </label>
      <Field type='password'
             name='password'
             autoComplete='current-password'
             className='u-full-width'/>
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Sign In
      </button>
    </Form>
  )
};

const CatalogerSignIn = () => {
  return (
    <div>
      <h3>Cataloger Sign In</h3>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => console.log(values)}
        render={CatalogerSignInForm}
      />
    </div>
  )
};

export default CatalogerSignIn;
