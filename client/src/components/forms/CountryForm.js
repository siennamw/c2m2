import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string(),
});

const InnerCountryForm = ({ handleSubmit, isSubmitting, status }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-error' />
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='description'>
        Description <ErrorMessage name='description' component='div' className='form-error' />
      </label>
      <Field type='text'
             name='description'
             className='u-full-width'
             component='textarea'/>
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Submit
      </button>
      {
        status ?
        <div className='form-error api-error'>{status}</div> :
        undefined
      }
    </Form>
  )
};

const CountryForm = () => {
  return (
    <div>
      <h3>New Country</h3>
      <Formik
        initialValues={{
          name: '',
          description: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => console.log(values)}
        render={InnerCountryForm}
      />
    </div>
  )
};

export default CountryForm;
