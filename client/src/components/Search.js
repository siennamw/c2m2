import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

import WorksList from './WorksList';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
});

const InnerBasicSearchForm = ({ handleSubmit, isSubmitting }) => (
  <Form>
    <label htmlFor="title">
      Title
      <ErrorMessage
        name="title"
        component="div"
        className="status-message form-message error"
      />
    </label>
    <Field
      type="text"
      name="title"
      className="u-full-width"
    />
    <button
      type="submit"
      className="button-primary u-full-width"
      disabled={isSubmitting}
      onClick={handleSubmit}
    >
      Submit
    </button>
  </Form>
);

class BasicSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showResults: false,
      filter: {},
    };
  }

  handleSubmit = (title, setSubmitting) => {
    const filter = {
      title_contains: title,
      OR: {
        secondary_title_contains: title,
        OR: { alias_alternates_contains: title },
      },
    };

    this.setState({ showResults: true, filter });
    setSubmitting(false);
  };

  render() {
    const { showResults, filter } = this.state;
    return (
      <div>
        <h2>Basic Work Search</h2>
        <Formik
          initialValues={{
            title: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => this.handleSubmit(values.title, setSubmitting)}
          render={InnerBasicSearchForm}
        />
        {
          showResults
            ? <WorksList filter={filter} resetButton />
            : undefined
        }
      </div>
    );
  }
}

export default BasicSearch;
