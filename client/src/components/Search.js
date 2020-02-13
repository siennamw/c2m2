import React, { useState } from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

import WorksList from './entries/work/WorksList';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
});

const InnerBasicSearchForm = ({ handleSubmit, isSubmitting }) => (
  <Form>
    <label htmlFor="title">
      Title
      <ErrorMessage
        className="status-message form-message error"
        component="div"
        name="title"
      />
      <Field
        className="u-full-width"
        id="title"
        name="title"
        type="text"
      />
    </label>
    <button
      className="button-primary u-full-width"
      disabled={isSubmitting}
      onClick={handleSubmit}
      type="submit"
    >
      Submit
    </button>
  </Form>
);

const BasicSearch = () => {
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState({});

  const handleSubmit = (title, setSubmitting) => {
    setFilter({
      title_contains: title,
      OR: {
        secondary_title_contains: title,
        OR: { alias_alternates_contains: title },
      },
    });
    setShowResults(true);
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Basic Work Search</h2>
      <Formik
        initialValues={{
          title: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => handleSubmit(values.title, setSubmitting)}
        render={InnerBasicSearchForm}
      />
      {
        showResults
          ? <WorksList filter={filter} />
          : undefined
      }
    </div>
  );
};

export default BasicSearch;
