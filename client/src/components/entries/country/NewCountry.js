import React from 'react';

import NewEntry from '../NewEntry';

import CountryForm from './CountryForm';
import { CREATE_COUNTRY } from '../../../mutations';
import { countryValidationSchema } from '../../../validationSchemas';

const NewCountry = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={CountryForm}
    gqlMutation={CREATE_COUNTRY}
    title="New Country"
    yupSchema={countryValidationSchema}
  />
);

export default NewCountry;
