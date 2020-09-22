import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormikContext,
} from 'formik';

const InnerSearchForm = ({ fieldName, label }) => {
  const { handleSubmit, isSubmitting } = useFormikContext();

  return (
    <Form>
      <label htmlFor={fieldName}>
        {label}
        <ErrorMessage
          className="status-message form-message error"
          component="div"
          name={fieldName}
        />
        <Field
          className="u-full-width"
          id={fieldName}
          name={fieldName}
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
};

InnerSearchForm.propTypes = {
  fieldName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const SimpleEntrySearchForm = ({
  fieldName,
  filterBuilder,
  label,
  ResultsComponent,
  validationSchema,
}) => {
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState({});

  const onSubmit = (title, setSubmitting) => {
    const newFilter = filterBuilder(title);
    setFilter(newFilter);
    setShowResults(true);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        initialValues={{
          [fieldName]: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => onSubmit(values[fieldName], setSubmitting)}
      >
        <InnerSearchForm fieldName={fieldName} label={label} />
      </Formik>
      {
        showResults
          ? <ResultsComponent filter={filter} />
          : undefined
      }
    </div>
  );
};

SimpleEntrySearchForm.propTypes = {
  fieldName: PropTypes.string,
  filterBuilder: PropTypes.func.isRequired,
  label: PropTypes.string,
  ResultsComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  validationSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

SimpleEntrySearchForm.defaultProps = {
  fieldName: 'name',
  label: 'Name',
};

export default SimpleEntrySearchForm;
