import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { isEmpty } from 'lodash';

import EntryFormWrapper from './EntryFormWrapper';
import {
  getInitialFormValuesForSchema,
  getNormalizedSubmissionValuesForSchema,
} from '../../validationSchemas';

const NewEntry = ({
  entryIsSelf,
  FormComponent,
  gqlMutation,
  initialValues,
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
        resetForm(getInitialFormValuesForSchema(yupSchema));
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
  entryIsSelf: false,
  initialValues: null,
  selfIsAdmin: false,
};

NewEntry.propTypes = {
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
  selfIsAdmin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired,
};

export default NewEntry;
