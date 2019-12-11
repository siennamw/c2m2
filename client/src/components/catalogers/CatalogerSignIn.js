import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import * as Yup from 'yup';

import { AuthContext } from '../App';
import { SIGN_IN } from '../../mutations';
import { signIn } from '../../utils';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required'),
});

const CatalogerSignInForm = ({ handleSubmit, isSubmitting, status }) => (
  <Form>
    <label htmlFor="email">
      Email
      <ErrorMessage
        className="status-message form-message error"
        component="div"
        name="email"
      />
      <Field
        autoComplete="email"
        className="u-full-width"
        id="email"
        name="email"
        type="email"
      />
    </label>
    <label htmlFor="password">
      Password
      <ErrorMessage
        className="status-message form-message error"
        component="div"
        name="password"
      />
      <Field
        autoComplete="current-password"
        className="u-full-width"
        id="password"
        name="password"
        type="password"
      />
    </label>
    <button
      className="button-primary u-full-width"
      disabled={isSubmitting}
      onClick={handleSubmit}
      type="submit"
    >
      Sign In
    </button>
    {
      status
        ? (
          <div className={`status-message ${status.type}`}>
            {status.message}
          </div>
        )
        : undefined
    }
  </Form>
);

const CatalogerSignIn = ({ location }) => {
  const {
    authenticated,
    setAuthenticated,
    setAdmin,
    setId,
  } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(authenticated);
  const [signInMutation] = useMutation(SIGN_IN);

  const handleSubmit = async ({ email, password }, setSubmitting, setStatus) => {
    try {
      const variables = {
        email,
        password,
      };
      const {
        data: { signInCataloger: { cataloger, token } },
        error,
      } = await signInMutation({ variables });

      setSubmitting(false);

      if (cataloger && token) {
        signIn(token);
        setAdmin(cataloger.isAdmin);
        setAuthenticated(true);
        setId(cataloger.id);
        setRedirect(true);
      } else {
        console.log('Failed to sign in', error);
        setAuthenticated(false);
        setStatus({
          type: 'error',
          message: 'Failed to sign in. Please check email and password.',
        });
      }
    } catch (err) {
      console.log('Error signing in', err);
      setAuthenticated(false);
      setStatus({
        type: 'error',
        message: 'Unknown error signing in. Please try again later.',
      });
    }
  };

  const from = (
    location.state
    && location.state.from
    && location.state.from.pathname !== '/sign-out'
  )
    ? location.state.from
    : { pathname: '/dashboard/home' };

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
      <div className="center-text">
        <Link to="request-reset-password">
          Forgot your password? Click here to reset it.
        </Link>
      </div>
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
