import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  location: Yup.string()
    .required('Location is required'),
  website: Yup.string()
    .url('Website is not a valid URL'),
});

const InnerRepositoryForm = ({ handleSubmit, isSubmitting }) => {
  return (
    <Form>
      <label htmlFor='name'>
        Name <ErrorMessage name='name' component='div' className='form-error' />
      </label>
      <Field type='text'
             name='name'
             className='u-full-width'/>
      <label htmlFor='location'>
        Location <ErrorMessage name='location' component='div' className='form-error' />
      </label>
      <Field type='text'
             name='location'
             className='u-full-width'/>
      <label htmlFor='website'>
        Website <ErrorMessage name='website' component='div' className='form-error' />
      </label>
      <Field type='url'
             name='website'
             className='u-full-width'/>
      <button type='submit'
              className='button-primary u-full-width'
              disabled={isSubmitting}
              onClick={handleSubmit}>
        Submit
      </button>
    </Form>
  )
};

const RepositoryForm = () => {
  return (
    <div>
      <h3>New Repository</h3>
      <Formik
        initialValues={{
          name: '',
          location: '',
          website: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => console.log(values)}
        render={InnerRepositoryForm}
      />
    </div>
  )
};

export default RepositoryForm;
