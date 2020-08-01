import React from 'react';
import { Mutation } from '@apollo/react-components';
import {
  Formik,
  ErrorMessage,
  Form,
  useFormikContext,
} from 'formik';
import ReCAPTCHA from 'react-google-recaptcha';
import * as Yup from 'yup';

import * as mutations from '../../mutations';

import FormStatus from '../FormStatus';
import InputField from '../entries/InputField';

const InnerSuggestionForm = () => {
  const {
    handleSubmit,
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
        displayName="Composer(s) Concerned"
        fieldName="composers"
      />
      <InputField
        displayName="Major Work(s) and/or Film(s) Concerned"
        fieldName="works"
      />
      <InputField
        displayName="Link to Resource"
        fieldName="link"
        fieldType="url"
      />
      <InputField
        displayName="Location (name of library, repository, database...)"
        fieldName="location"
      />
      <InputField
        component="textarea"
        displayName="Comments"
        fieldName="comments"
      />
      <label htmlFor="recaptcha">
        {/* actual label is provided by ReCAPTCHA */}
        <ErrorMessage
          name="recaptcha"
          component="div"
          className="status-message form-message error"
        />
        <ReCAPTCHA
          id="recaptcha"
          className="g-recaptcha"
          onChange={(response) => {
            setFieldValue('recaptcha', response);
          }}
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        />
      </label>
      <button
        type="submit"
        className="button-primary u-full-width"
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        Submit
      </button>
      <FormStatus />
    </Form>
  );
};

const ResourceSuggestion = () => {
  const initialValues = {
    name: '',
    email: '',
    composer: '',
    works: '',
    link: '',
    location: '',
    comment: '',
    recaptcha: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('E-mail is not valid')
      .required('E-mail is required'),
    composers: Yup.string(),
    works: Yup.string(),
    link: Yup.string()
      .url('Link is not a valid URL'),
    location: Yup.string(),
    comments: Yup.string(),
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
          composers: values.composers,
          works: values.works,
          link: values.link,
          location: values.location,
          comments: values.comments,
        },
      };
      const { data } = await mutation(payload);
      setSubmitting(false);

      if (data.handleSuggestionForm) {
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
      <h2>Suggest a Resource</h2>
      <Mutation mutation={mutations.HANDLE_SUGGESTION_FORM}>
        {(handleSuggestionForm) => (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
              handleSubmit(handleSuggestionForm, values, setSubmitting, setStatus, resetForm)
            )}
          >
            <InnerSuggestionForm />
          </Formik>
        )}
      </Mutation>
    </div>
  );
};

export default ResourceSuggestion;
