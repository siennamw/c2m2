import React, { Fragment } from 'react';
import InputField from '../InputField';

const CountryForm = () => (
  <Fragment>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="Description" fieldName="description" />
  </Fragment>
);

export default CountryForm;
