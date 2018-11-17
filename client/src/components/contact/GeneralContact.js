import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";

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

const InnerContactForm = ({ handleSubmit, isSubmitting, setFieldValue }) => {
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
      <label htmlFor='message'>
        Message <ErrorMessage name='message' component='div' className='form-error'/>
      </label>
      <Field type='text'
             name='message'
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

const GeneralContact = () => (
  <div>
    <h2>Contact Us</h2>
    <Formik
      initialValues={{
        name: '',
        email: '',
        message: '',
        recaptcha: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => console.log(values)}
      render={InnerContactForm}
    />
  </div>
);

export default GeneralContact;
