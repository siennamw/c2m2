import React, { Fragment } from 'react';
import InputField from '../InputField';

const MaterialFormatForm = () => (
  <Fragment>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="Description" fieldName="description" />
  </Fragment>
);

export default MaterialFormatForm;
