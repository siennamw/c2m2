import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';
import * as Yup from 'yup';

import { GET_RESET_PASSWORD_TOKEN } from '../../mutations';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
});

const RequestResetPasswordForm = ({ handleSubmit, isSubmitting, status }) => (
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
    <button
      className="button-primary u-full-width"
      disabled={isSubmitting}
      onClick={handleSubmit}
      type="submit"
    >
      Request Password Reset
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

const RequestResetPassword = () => {
  const [resetPasswordMutation] = useMutation(GET_RESET_PASSWORD_TOKEN);

  const handleSubmit = async ({ email }, setSubmitting, setStatus) => {
    try {
      const variables = {
        email,
      };
      const {
        data: { getResetPasswordToken },
      } = await resetPasswordMutation({ variables });

      setSubmitting(false);

      if (getResetPasswordToken) {
        setStatus({
          type: 'success',
          message: 'Request was successful. Check your email for instructions.',
        });
      }
    } catch (err) {
      console.log('Error requesting password change', err);
      setStatus({
        type: 'error',
        message: 'Unknown error requesting password change. Please try again later.',
      });
    }
  };


  return (
    <div>
      <h2>Request Cataloger Password Reset</h2>
      <Formik
        initialValues={{
          email: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, setStatus }) => (
          handleSubmit(values, setSubmitting, setStatus)
        )}
        render={RequestResetPasswordForm}
      />
    </div>
  );
};

export default RequestResetPassword;
