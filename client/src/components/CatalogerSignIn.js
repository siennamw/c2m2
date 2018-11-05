import React from 'react';

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as constants from '../constants';

const SIGN_IN_MUTATION = gql`
  mutation SignInCataloger($email: String!, $password: String!){
    signInCataloger(email: {email: $email, password: $password}) {
      token
      cataloger {
        id
        name
        email
      }
    }
  }
`;

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
  const handleSubmit = async (mutation, values) => {
    const payload = {
      variables: {
        email: values.email,
        password: values.password
      }
    };
    const {data} = await mutation(payload);

    if(data.signInCataloger){
      sessionStorage.setItem(constants.SESSION_STORAGE_KEY, data.signInCataloger.token);
    } else {
      console.log('failed to sign in');
    };
  };

  return (
    <div>
      <h2>Cataloger Sign In</h2>
      <Mutation mutation={SIGN_IN_MUTATION}>
        {(signInMutation) => (
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => handleSubmit(signInMutation, values)}
            render={CatalogerSignInForm}
          />
        )}
      </Mutation>
    </div>
  )
};

export default CatalogerSignIn;
