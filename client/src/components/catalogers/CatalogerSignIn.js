import React from 'react';
import { Redirect } from 'react-router-dom';

import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import * as constants from '../../constants';
import { isAuthenticated } from '../../utils';

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
        Email <ErrorMessage name='email' component='div' className='form-error'/>
      </label>
      <Field type='email'
             name='email'
             autoComplete='email'
             className='u-full-width'/>
      <label htmlFor='password'>
        Password <ErrorMessage name='password' component='div' className='form-error'/>
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

class CatalogerSignIn extends React.Component {
  state = {
    redirect: isAuthenticated(), // if authenticated, redirect immediately
  };

  handleSubmit = async (mutation, values, setSubmitting) => {
    const payload = {
      variables: {
        email: values.email,
        password: values.password
      }
    };
    const { data } = await mutation(payload);
    setSubmitting(false);

    if (data.signInCataloger) {
      sessionStorage.setItem(constants.SESSION_STORAGE_KEY, data.signInCataloger.token);
      this.setState({ redirect: true });
    } else {
      console.log('failed to sign in');
    }
  };

  render = () => {
    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } };
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={from}/>;
    }

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
              onSubmit={(values, { setSubmitting }) => this.handleSubmit(signInMutation, values, setSubmitting)}
              render={CatalogerSignInForm}
            />
          )}
        </Mutation>
      </div>
    )
  }
};

export default CatalogerSignIn;
