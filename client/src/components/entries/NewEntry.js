import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { isEmpty } from 'lodash';
import EntryFormWrapper from './EntryFormWrapper';

const NewEntry = ({
  entryIsSelf,
  FormComponent,
  gqlMutation,
  initialValues,
  refetch,
  selfIsAdmin,
  title,
  yupSchema,
}) => {
  const variablesList = Object.keys(yupSchema.fields);

  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    try {
      // prepare data for submission to server
      // (coerce strings to required data types)
      const variables = variablesList.reduce((acc, item) => {
        if (Array.isArray(values[item])) {
          // coerce array of strings to array of numbers
          acc[item] = values[item].map(i => Number(i));
        } else if (['true', 'false'].includes(values[item])) {
          // coerce to boolean
          acc[item] = values[item] === 'true';
        } else if (typeof values[item] === 'string' && values[item].match(/^\d+$/)) {
          // coerce digit string to number
          acc[item] = Number(values[item]);
        } else if (values[item]) {
          // assign value without coercion
          acc[item] = values[item];
        } else {
          acc[item] = null;
        }

        return acc;
      }, {});

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
  refetch: null,
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
  refetch: PropTypes.func,
  selfIsAdmin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired,
};

export default NewEntry;
