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

const InnerSuggestionForm = () => {
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
          name="name"
          component="div"
          className="status-message form-message error"
        />
        <Field
          id="name"
          type="text"
          name="name"
          className="u-full-width"
        />
      </label>
      <label htmlFor="email">
        Email
        <ErrorMessage
          name="email"
          component="div"
          className="status-message form-message error"
        />
        <Field
          id="email"
          type="email"
          name="email"
          className="u-full-width"
        />
      </label>
      <label htmlFor="composers">
        Composer(s) Concerned
        <ErrorMessage
          name="composers"
          component="div"
          className="status-message form-message error"
        />
        <Field
          id="composers"
          type="text"
          name="composers"
          className="u-full-width"
        />
      </label>
      <label htmlFor="works">
        Major Work(s) and/or Film(s) Concerned
        <ErrorMessage
          name="works"
          component="div"
          className="status-message form-message error"
        />
        <Field
          id="works"
          type="text"
          name="works"
          className="u-full-width"
        />
      </label>
      <label htmlFor="link">
        Link to Resource
        <ErrorMessage
          name="link"
          component="div"
          className="status-message form-message error"
        />
        <Field
          id="link"
          type="text"
          name="link"
          className="u-full-width"
        />
      </label>
      <label htmlFor="location">
        Location (name of library, repository, database...)
        <ErrorMessage
          name="location"
          component="div"
          className="status-message form-message error"
        />
        <Field
          id="location"
          type="text"
          name="location"
          className="u-full-width"
        />
      </label>
      <label htmlFor="comments">
        Comments
        <ErrorMessage
          name="comments"
          component="div"
          className="status-message form-message error"
        />
        <Field
          id="comments"
          type="text"
          name="comments"
          className="u-full-width"
          component="textarea"
        />
      </label>
      <ErrorMessage
        name="recaptcha"
        component="div"
        className="status-message form-message error"
      />
      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
        className="g-recaptcha"
        onChange={(response) => {
          setFieldValue('recaptcha', response);
        }}
      />
      <button
        type="submit"
        className="button-primary u-full-width"
        disabled={isSubmitting || !isValid}
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
        {handleSuggestionForm => (
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
}

export default ResourceSuggestion;
