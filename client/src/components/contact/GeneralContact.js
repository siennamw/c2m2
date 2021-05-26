import React from 'react';
import { Mutation } from '@apollo/client/react/components';
import {
  ErrorMessage,
  Form,
  Formik,
  useFormikContext,
} from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

import * as mutations from '../../mutations';

import FormStatus from '../FormStatus';
import InputField from '../entries/InputField';

const InnerContactForm = () => {
  const {
    isSubmitting,
    setFieldValue,
  } = useFormikContext();

  return (
    <Form>
      <InputField
        displayName="Name"
        fieldName="name"
      />
      <InputField
        displayName="Email"
        fieldName="email"
        fieldType="email"
      />
      <InputField
        component="textarea"
        displayName="Message"
        fieldName="message"
      />
      <label htmlFor="recaptcha">
        {/* actual label is provided by ReCAPTCHA */}
        <ErrorMessage
          className="status-message form-message error"
          component="div"
          name="recaptcha"
        />
        <ReCAPTCHA
          className="g-recaptcha"
          id="recaptcha"
          onChange={(response) => {
            setFieldValue('recaptcha', response);
          }}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        />
      </label>
      <button
        className="button-primary u-full-width"
        disabled={isSubmitting}
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
        {(handleContactForm) => (
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
