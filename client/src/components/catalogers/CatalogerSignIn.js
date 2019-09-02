import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import * as Yup from 'yup';

import { SIGN_IN } from '../../mutations';
import { isAuthenticated, signIn } from '../../utils';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required')
});

const CatalogerSignInForm = ({ handleSubmit, isSubmitting, status }) => {
  return (
    <Form>
      <label htmlFor='email'>
        Email
        <ErrorMessage name='email'
                      component='div'
                      className='status-message form-message error'
        />
      </label>
      <Field type='email'
             name='email'
             autoComplete='email'
             className='u-full-width' />
      <label htmlFor='password'>
        Password
        <ErrorMessage name='password'
                      component='div'
                      className='status-message form-message error'
        />
      </label>
      <Field type='password'
             name='password'
             autoComplete='current-password'
             className='u-full-width' />
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Sign In
      </button>
      {
        status
          ? <div
            className={`status-message ${status.type}`}>{status.message}</div>
          : undefined
      }
    </Form>
  );
};

const CatalogerSignIn = ({ location }) => {
  // if authenticated, redirect immediately
  const [redirect, setRedirect] = useState(isAuthenticated());

  const [signInMutation] = useMutation(SIGN_IN);

  const handleSubmit = async ({ email, password }, setSubmitting, setStatus) => {
    try {
      const variables = {
        email,
        password,
      };
      const {
        data: { signInCataloger: { token } },
        error,
      } = await signInMutation({ variables });

      setSubmitting(false);

      if (token) {
        signIn(token);
        setRedirect(true);
      } else {
        console.log('Failed to sign in', error);
        setStatus({
          type: 'error',
          message: 'Failed to sign in. Please check email and password.',
        });
      }
    } catch (err) {
      console.log('Error signing in', err);
      setStatus({
        type: 'error',
        message: 'Unknown error signing in. Please try again later.',
      });
    }
  };

  const { from } = location.state || { from: { pathname: '/dashboard/home' } };

  if (redirect) {
    return <Redirect to={from} />;
  }

  return (
    <div>
      <h2>Cataloger Sign In</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => (
          handleSubmit(values, setSubmitting, setStatus)
        )}
        render={CatalogerSignInForm}
      />
    </div>
  );
};

CatalogerSignIn.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      from: PropTypes.shape({
        pathname: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default CatalogerSignIn;
