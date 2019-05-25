import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_COUNTRY } from '../../../mutations';
import { COUNTRY_BY_ID } from '../../../queries';
import { addIdToSchema, countryValidationSchema } from '../../../validationSchemas';

import CountryForm from './CountryForm';

const EditCountry = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(countryValidationSchema);

  return (
    <EditEntry
      FormComponent={CountryForm}
      gqlQuery={COUNTRY_BY_ID}
      gqlMutation={UPDATE_COUNTRY}
      id={id}
      mutationName="updateCountry"
      queryName="country"
      title="Edit Country"
      yupSchema={schema}
    />
  );
};

export default EditCountry;
