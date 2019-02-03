import React from 'react';
import { Mutation } from "react-apollo";
import { Formik, ErrorMessage, Field, Form } from "formik";
import ReCAPTCHA from "react-google-recaptcha";
import * as Yup from 'yup';

import * as mutations from '../../mutations';

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

const InnerContactForm = ({ handleSubmit, isSubmitting, setFieldValue, status }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='email'>
        Email <ErrorMessage name='email' component='div' className='form-message error'/>
      </label>
      <Field type='email'
             name='email'
             className='u-full-width'/>
      <label htmlFor='message'>
        Message <ErrorMessage name='message' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='message'
             className='u-full-width'
             component='textarea'/>
      <ErrorMessage name='recaptcha' component='div' className='form-message error'/>
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
      {
        status
        ? <div className={`form-message api-message ${status.type}`}>{status.message}</div>
        : undefined
      }
    </Form>
  )
};

class GeneralContact extends React.Component {
  handleSubmit = async (mutation, values, setSubmitting, setStatus) => {
    try {
      const payload = {
        variables: {
          name: values.name,
          email: values.email,
          message: values.message,
        }
      };
      const { data } = await mutation(payload);
      setSubmitting(false);

      if (data.handleContactForm) {
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

  render = () => {
    return (
      <div>
        <h2>Contact Us</h2>
        <Mutation mutation={mutations.HANDLE_CONTACT_FORM}>
          {(handleContactForm) => (
            <Formik
              initialValues={{
                name: '',
                email: '',
                message: '',
                recaptcha: '',
              }}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, setStatus }) => this.handleSubmit(handleContactForm, values, setSubmitting, setStatus)}
              render={InnerContactForm}
            />
          )}
        </Mutation>
      </div>
    )
  }
}

export default GeneralContact;
