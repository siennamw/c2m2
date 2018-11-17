import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import WorksList from "./WorksList";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
});

const InnerBasicSearchForm = ({ handleSubmit, isSubmitting }) => {
  return (
    <Form>
      <label htmlFor='title'>
        Title <ErrorMessage name='title' component='div' className='form-message error'/>
      </label>
      <Field type='text'
             name='title'
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
    };
    this.setState({ showResults: true, filter: filter });
    setSubmitting(false);
  };

  render() {
    return (
      <div>
        <h2>Basic Search</h2>
        <Formik
          initialValues={{
            title: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => this.handleSubmit(values.title, setSubmitting)}
          render={InnerBasicSearchForm}
        />
        {this.state.showResults ? <WorksList filter={this.state.filter} resetButton={true} /> : undefined}
      </div>
    )
  }
}

export default BasicSearch;
