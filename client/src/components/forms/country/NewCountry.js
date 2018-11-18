import React from "react";

import NewEntry from '../../NewEntry';

import CountryForm from './CountryForm';
import { CREATE_COUNTRY } from '../../../mutations';
import { countryValidationSchema } from '../../../validationSchemas';

const NewCountry = () => {
  return (
    <NewEntry
      title='New Country'
      variablesList={Object.keys(countryValidationSchema.fields)}
      gqlMutation={CREATE_COUNTRY}
      yupSchema={countryValidationSchema}
      FormComponent={CountryForm}
    />
  );
};

export default NewCountry;
