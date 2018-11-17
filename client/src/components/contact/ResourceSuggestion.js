import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  composer: Yup.string(),
  works: Yup.string(),
  link: Yup.string()
    .url('Link is not a valid URL'),
  location: Yup.string(),
  comment: Yup.string(),
  recaptcha: Yup.string()
    .required('ReCaptcha is required'),
});

const InnerSuggestionForm = ({ handleSubmit, isSubmitting, setFieldValue }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-error'/>
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='email'>
        Email <ErrorMessage name='email' component='div' className='form-error'/>
      </label>
      <Field type='email'
             name='email'
             className='u-full-width'/>
      <label htmlFor='composer'>
        Composer(s) Concerned <ErrorMessage name='composer' component='div' className='form-error'/>
      </label>
      <Field type='text'
             name='composer'
             className='u-full-width'/>
      <label htmlFor='works'>
        Major Work(s) and/or Film(s) Concerned <ErrorMessage name='works' component='div' className='form-error'/>
      </label>
      <Field type='text'
             name='works'
             className='u-full-width'/>
      <label htmlFor='link'>
        Link to Resource <ErrorMessage name='link' component='div' className='form-error'/>
      </label>
      <Field type='text'
             name='link'
             className='u-full-width'/>
      <label htmlFor='location'>
        Location (name of library, repository, database...) <ErrorMessage name='location' component='div' className='form-error'/>
      </label>
      <Field type='text'
             name='location'
             className='u-full-width'/>
      <label htmlFor='comment'>
        Comments <ErrorMessage name='comment' component='div' className='form-error'/>
      </label>
      <Field type='text'
             name='comment'
             className='u-full-width'
             component='textarea'/>
      <ErrorMessage name='recaptcha' component='div' className='form-error'/>
      <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                 className="g-recaptcha"
                 onChange={(response) => {
                   setFieldValue("recaptcha", response);
                 }}/>
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Submit
      </button>
    </Form>
  )
};

const ResourceSuggestion = () => (
  <div>
    <h2>Suggest a Resource</h2>
    <Formik
      initialValues={{
        name: '',
        email: '',
        composer: '',
        works: '',
        link: '',
        location: '',
        comment: '',
        recaptcha: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => console.log(values)}
      render={InnerSuggestionForm}
    />
  </div>
);

export default ResourceSuggestion;
