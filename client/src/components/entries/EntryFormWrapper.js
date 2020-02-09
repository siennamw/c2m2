import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

import { getInitialFormValuesForSchema } from '../../validationSchemas';

import FormStatus from '../FormStatus';

const EntryFormWrapper = ({
  FormComponent,
  handleSubmit,
  initialValues,
  mutation,
  validationSchema,
}) => (
  <Formik
    initialValues={getInitialFormValuesForSchema(validationSchema, initialValues)}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
      handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)
    )}
  >
    {props => (
      <Form>
        <FormComponent
          {...props}
        />
        <button
          type="submit"
          className="button-primary u-full-width"
          disabled={props.isSubmitting}
        >
          Submit
        </button>
        <FormStatus />
      </Form>
    )}
  </Formik>
);

EntryFormWrapper.defaultProps = {
  initialValues: null,
};

EntryFormWrapper.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
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
