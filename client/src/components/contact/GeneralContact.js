import React from 'react';
import { Mutation } from '@apollo/react-components';
import {
  Formik,
  ErrorMessage,
  Field,
  Form,
  useFormikContext,
} from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

import * as mutations from '../../mutations';

import FormStatus from '../FormStatus';

const InnerContactForm = () => {
  const {
    handleSubmit,
    isSubmitting,
    isValid,
    setFieldValue,
  } = useFormikContext();

  return (
    <Form>
      <label htmlFor="name">
        Name
        <ErrorMessage
          className="status-message form-message error"
          component="div"
          name="name"
        />
        <Field
          className="u-full-width"
          id="name"
          name="name"
          type="text"
        />
      </label>
      <label htmlFor="email">
        Email
        <ErrorMessage
          className="status-message form-message error"
          component="div"
          name="email"
        />
        <Field
          className="u-full-width"
          id="email"
          name="email"
          type="email"
        />
      </label>
      <label htmlFor="message">
        Message
        <ErrorMessage
          className="status-message form-message error"
          component="div"
          name="message"
        />
        <Field
          className="u-full-width"
          component="textarea"
          id="message"
          name="message"
          type="text"
        />
      </label>
      <ErrorMessage
        className="status-message form-message error"
        component="div"
        name="recaptcha"
      />
      <ReCAPTCHA
        className="g-recaptcha"
        onChange={(response) => {
          setFieldValue('recaptcha', response);
        }}
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      />
      <button
        className="button-primary u-full-width"
        disabled={isSubmitting || !isValid}
        onClick={handleSubmit}
        type="submit"
      >
        Submit
      </button>
      <FormStatus />
    </Form>
  );
};

const GeneralContact = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
    recaptcha: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('E-mail is not valid')
      .required('E-mail is required'),
    message: Yup.string()
      .required('Message is required'),
    recaptcha: Yup.string()
      .required('ReCaptcha is required'),
  });

  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    setStatus(null);

    try {
      const payload = {
        variables: {
          name: values.name,
          email: values.email,
          message: values.message,
        },
      };
      const { data } = await mutation(payload);
      setSubmitting(false);

      if (data.handleContactForm) {
        resetForm();
        setStatus({
          type: 'success',
          message: 'Success!',
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Sorry, your form was not submitted successfully.  Please try again later.',
        });
      }
    } catch (err) {
      console.log('Error submitting resource suggestion form', err);
      setStatus({
        type: 'error',
        message: 'Sorry, your form was not submitted successfully.  Please try again later.',
      });
    }
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <Mutation mutation={mutations.HANDLE_CONTACT_FORM}>
        {handleContactForm => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
              handleSubmit(handleContactForm, values, setSubmitting, setStatus, resetForm)
            )}
          >
            <InnerContactForm />
          </Formik>
        )}
      </Mutation>
    </div>
  );
};

export default GeneralContact;
