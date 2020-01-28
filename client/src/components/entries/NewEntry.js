import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from '@apollo/react-components';
import { isEmpty } from 'lodash';

import EntryFormWrapper from './EntryFormWrapper';
import {
  getInitialFormValuesForSchema,
  getNormalizedSubmissionValuesForSchema,
} from '../../validationSchemas';

const NewEntry = ({
  successCallback,
  clearAfterSubmit,
  FormComponent,
  gqlMutation,
  initialValues,
  mutationName,
  title,
  yupSchema,
}) => {
  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    try {
      const variables = getNormalizedSubmissionValuesForSchema(yupSchema, values);
      const payload = { variables };
      const { data } = await mutation(payload);

      if (data && !isEmpty(data)) {
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
          message: 'Failed. Please try again later.',
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
    <div>
      <h3>{title}</h3>
      <Mutation mutation={gqlMutation}>
        {mutation => (
          <EntryFormWrapper
            FormComponent={FormComponent}
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            mutation={mutation}
            validationSchema={yupSchema}
          />
        )}
      </Mutation>
    </div>
  );
};

NewEntry.defaultProps = {
  clearAfterSubmit: false,
  initialValues: null,
  successCallback: null,
};

NewEntry.propTypes = {
  clearAfterSubmit: PropTypes.bool,
  FormComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  gqlMutation: PropTypes.object.isRequired,
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
  mutationName: PropTypes.string.isRequired,
  successCallback: PropTypes.func,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired,
};

export default NewEntry;
