import React from 'react';
import { Mutation } from 'react-apollo';

import { isEmpty } from 'lodash';
import EntryFormWrapper from './EntryFormWrapper';

const NewEntry = ({ title, gqlMutation, yupSchema, FormComponent, initialValues }) => {
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

export default NewEntry;
