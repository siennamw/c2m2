import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { isEmpty } from 'lodash';
import EntryFormWrapper from './EntryFormWrapper';

const NewEntry = ({
  FormComponent,
  gqlMutation,
  initialValues,
  refetch,
  title,
  yupSchema,
}) => {
  const variablesList = Object.keys(yupSchema.fields);

  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    try {
      const variables = variablesList.reduce((acc, item) => {
        acc[item] = values[item] ? values[item] : null;
        return acc;
      }, {});

      // ID to number if present (for editing existing entries)
      if (variables.id) {
        variables.id = Number(variables.id);
      }

      const payload = { variables };
      const { data } = await mutation(payload);

      if (data && !isEmpty(data)) {
        if (refetch) await refetch();
        resetForm();
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
  refetch: null,
};

NewEntry.propTypes = {
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
  refetch: PropTypes.func,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired,
};

export default NewEntry;
