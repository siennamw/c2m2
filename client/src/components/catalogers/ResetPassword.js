import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import * as Yup from 'yup';

import { RESET_PASSWORD } from '../../mutations';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  new_password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required'),
});

const CatalogerResetPasswordForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <label htmlFor="new_password">
      New Password
      <ErrorMessage
        className="status-message form-message error"
        component="div"
        name="new_password"
      />
      <Field
        autoComplete="current-password"
        className="u-full-width"
        id="new_password"
        name="new_password"
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

const ResetPassword = ({ match }) => {
  const [resetPasswordMutation] = useMutation(RESET_PASSWORD);

  const handleSubmit = async ({ email, new_password }, setSubmitting, setStatus) => {
    setStatus(null);

    try {
      const variables = {
        email,
        new_password,
        reset_token: match.params.resetToken,
      };
      const {
        data: { resetPassword },
      } = await resetPasswordMutation({ variables });

      setSubmitting(false);

      if (resetPassword) {
        setStatus({
          type: 'success',
          message: 'Password was successfully changed. You may now log in with your new password.',
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed to change password. The link may be expired. Request a new one if needed.',
        });
      }
    } catch (err) {
      console.log('Error signing in', err);
      setStatus({
        type: 'error',
        message: 'Unknown error changing password. Please try again later.',
      });
    }
  };


  return (
    <div>
      <h2>Reset Cataloger Password</h2>
      <Formik
        initialValues={{
          email: '',
          new_password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => (
          handleSubmit(values, setSubmitting, setStatus)
        )}
        render={CatalogerResetPasswordForm}
      />
    </div>
  );
};

export default ResetPassword;
