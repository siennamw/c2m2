import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormikContext,
} from 'formik';
import * as Yup from 'yup';

import FormStatus from '../FormStatus';

import { AuthContext } from '../AuthContext';
import { SIGN_IN } from '../../mutations';
import { signIn, signOut } from '../../utils';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required'),
});

const CatalogerSignInForm = () => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
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
      <FormStatus />
    </Form>
  );
};

const CatalogerSignIn = ({ location }) => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(authenticated);
  const [signInMutation] = useMutation(SIGN_IN);

  const handleSubmit = async ({ email, password }, setSubmitting, setStatus) => {
    setStatus(null);

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
        setAuthenticated(true);
        setRedirect(true);
      } else {
        console.log('Failed to sign in', error);
        signOut();
        setAuthenticated(false);
        setStatus({
          type: 'error',
          message: 'Failed to sign in. Please check email and password.',
        });
      }
    } catch (err) {
      console.log('Error signing in', err);
      signOut();
      setAuthenticated(false);
      setStatus({
        type: 'error',
        message: 'Unknown error signing in. Please try again later.',
      });
    }
  };

  const from = location.state && location.state.from !== '/sign-out'
    ? location.state.from
    : '/dashboard/home';

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
      >
        <CatalogerSignInForm />
      </Formik>
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
      from: PropTypes.string,
    }),
  }).isRequired,
};

export default CatalogerSignIn;
