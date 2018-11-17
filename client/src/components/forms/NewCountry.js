import React from "react";
import { Mutation } from "react-apollo";

import { isEmpty } from 'lodash';

import CountryForm from './CountryForm';
import { CREATE_COUNTRY } from '../../mutations';
import { countryValidationSchema } from '../../validationSchemas';

const NewCountry = () => {
  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    try {
      const payload = {
        variables: {
          name: values.name,
          description: values.description ? values.description : null,
        }
      };
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
      <h3>New Country</h3>
      <Mutation mutation={CREATE_COUNTRY}>
        {(mutation) => (
          <CountryForm mutation={mutation}
                       handleSubmit={handleSubmit}
                       validationSchema={countryValidationSchema}/>
        )}
      </Mutation>
    </div>
  );
};

export default NewCountry;
