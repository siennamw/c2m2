import React, { Fragment } from 'react';
import InputField from '../InputField';

const RepositoryForm = () => (
  <Fragment>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="Location" fieldName="location" />
    <InputField displayName="Website" fieldName="website" fieldType="url" />
  </Fragment>
);

export default RepositoryForm;
