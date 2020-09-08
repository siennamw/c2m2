import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik, useFormikContext } from 'formik';

import { getInitialFormValuesForSchema } from '../../validationSchemas';

import FormStatus from '../FormStatus';

const SubmitButton = () => {
  const { isSubmitting, dirty } = useFormikContext();

  return (
    <button
      type="submit"
      className="button-primary u-full-width"
      disabled={isSubmitting || !dirty}
    >
      Submit
    </button>
  );
};

const EntryFormWrapper = ({
  FormComponent,
  handleSubmit,
  initialValues,
  validationSchema,
}) => (
  <Formik
    initialValues={getInitialFormValuesForSchema(validationSchema, initialValues)}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
      handleSubmit(values, setSubmitting, setStatus, resetForm)
    )}
  >
    <Form>
      <FormComponent />
      <SubmitButton />
      <FormStatus />
    </Form>
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
  validationSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default EntryFormWrapper;
