import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import CountryForm from './CountryForm';
import { CREATE_COUNTRY } from '../../../mutations';
import { countryValidationSchema } from '../../../validationSchemas';

const NewCountry = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    FormComponent={CountryForm}
    gqlMutation={CREATE_COUNTRY}
    mutationName="createCountry"
    title="New Country"
    yupSchema={countryValidationSchema}
  />
);

NewCountry.defaultProps = {
  successCallback: null,
};

NewCountry.propTypes = {
  successCallback: PropTypes.func,
};

export default NewCountry;
