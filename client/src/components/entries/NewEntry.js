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
  clearAfterSubmit,
  entryIsSelf,
  FormComponent,
  gqlMutation,
  initialValues,
  mutationName,
  selfIsAdmin,
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
            entryIsSelf={entryIsSelf}
            FormComponent={FormComponent}
            handleSubmit={handleSubmit}
            initialValues={initialValues}
            mutation={mutation}
            selfIsAdmin={selfIsAdmin}
            validationSchema={yupSchema}
          />
        )}
      </Mutation>
    </div>
  );
};

NewEntry.defaultProps = {
  clearAfterSubmit: false,
  entryIsSelf: false,
  initialValues: null,
  mutationName: null,
  selfIsAdmin: false,
};

NewEntry.propTypes = {
  clearAfterSubmit: PropTypes.bool,
  entryIsSelf: PropTypes.bool,
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
  mutationName: (props, propName) => {
    if (
      !props.clearAfterSubmit
      && (!props[propName] || typeof props[propName] !== 'string')
    ) {
      return new Error('mutationName is required if clearAfterSubmit is false');
    }
    return null;
  },
  selfIsAdmin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired,
};

export default NewEntry;
