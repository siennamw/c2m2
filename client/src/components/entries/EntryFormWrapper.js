import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

const EntryFormWrapper = ({
  FormComponent,
  handleSubmit,
  initialValues,
  mutation,
  validationSchema,
}) => {
  const vals = initialValues
    || Object.keys(validationSchema.fields).reduce((acc, item) => {
      acc[item] = item.includes('ids') ? [] : '';
      return acc;
    }, {});

  return (
    <Formik
      initialValues={vals}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
        handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)
      )}
      render={props => <FormComponent {...props} />}
    />
  );
};

EntryFormWrapper.defaultProps = {
  initialValues: null,
};

EntryFormWrapper.propTypes = {
  FormComponent: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: (props, propName, componentName) => {
    props.validationSchema
      .isValid(props[propName])
      .then((valid) => {
        if (!valid) {
          return new Error(`Invalid prop ${propName} supplied to ${componentName}.`);
        }
        return true;
      });
  },
  mutation: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
};

export default EntryFormWrapper;
