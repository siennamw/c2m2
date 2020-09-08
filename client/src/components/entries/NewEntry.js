import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useMutation } from '@apollo/react-hooks';

import EntryFormWrapper from './EntryFormWrapper';

import {
  getInitialFormValuesForSchema,
  getNormalizedSubmissionValuesForSchema,
} from '../../validationSchemas';
import * as mutations from '../../mutations';

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
  const [mutation] = useMutation(gqlMutation);

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
    <div>
      <h3>{title}</h3>
      <EntryFormWrapper
        FormComponent={FormComponent}
        handleSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={yupSchema}
      />
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
  gqlMutation: PropTypes.oneOf(Object.values(mutations)).isRequired,
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
  yupSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default NewEntry;
