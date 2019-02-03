import React from 'react';
import { Mutation } from 'react-apollo';

import { isEmpty } from 'lodash';

const NewEntry = ({
  title, variablesList, gqlMutation, yupSchema, FormComponent,
}) => {
  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    try {
      const variables = variablesList.reduce((acc, item) => {
        let val = values[item] ? values[item] : null;

        if(val && yupSchema.fields[item]._type === 'number') {
          // coerce string to number if yupSchema is looking for a number
          val = Number(val);
        }

        acc[item] = val;
        return acc;
      }, {});

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
          <FormComponent
            mutation={mutation}
            handleSubmit={handleSubmit}
            validationSchema={yupSchema}
          />
        )}
      </Mutation>
    </div>
  );
};

export default NewEntry;
