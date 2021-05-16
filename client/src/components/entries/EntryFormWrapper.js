import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import { isEmpty } from 'lodash';

import {
  getInitialFormValuesForSchema,
  getNormalizedSubmissionValuesForSchema
} from '../../validationSchemas';

import FormStatus from '../FormStatus';

const EntryFormWrapper = ({
  children,
  clearAfterSubmit,
  initialValues,
  mutation,
  mutationName,
  successCallback,
  yupSchema,
}) => {
  const handleSubmit = async (values, setSubmitting, setStatus, resetForm) => {
    setStatus(null);

    try {
      const variables = getNormalizedSubmissionValuesForSchema(yupSchema, values);
      const payload = { variables };
      const { data, errors } = await mutation(payload);

      if (!errors && data && !isEmpty(data)) {
        if (clearAfterSubmit) {
          resetForm(getInitialFormValuesForSchema(yupSchema));
        } else if (data[mutationName]) {
          resetForm(getInitialFormValuesForSchema(yupSchema, data[mutationName]));
        }

        setStatus({
          type: 'success',
          message: 'Success!',
        });

        if (successCallback && data[mutationName]) {
          successCallback(data[mutationName]);
        }
      } else {
        setStatus({
          type: 'error',
          message: errors
            ? errors.map(({ message }) => message).join('; ')
            : 'Failed. Please try again later.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message,
      });
    }

    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize // solves old values being shown after form submit
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
        handleSubmit(values, setSubmitting, setStatus, resetForm)
      )}
      validationSchema={yupSchema}
    >
      <Form>
        {children}
        <FormStatus />
      </Form>
    </Formik>
  );
};

EntryFormWrapper.defaultProps = {
  clearAfterSubmit: false,
  successCallback: null,
};

EntryFormWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  clearAfterSubmit: PropTypes.bool,
  initialValues: (props, propName, componentName) => {
    props.yupSchema
      .isValid(props[propName])
      .then((valid) => {
        if (!valid) {
          return new Error(`Invalid prop ${propName} supplied to ${componentName}.`);
        }
        return true;
      });
  },
  mutation: PropTypes.func.isRequired,
  mutationName: PropTypes.string.isRequired,
  successCallback: PropTypes.func,
  yupSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default EntryFormWrapper;
