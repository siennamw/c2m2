import React, { Fragment } from 'react';
import InputField from '../InputField';

const DirectorForm = () => (
  <Fragment>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="IMDB Link" fieldName="imdb_link" fieldType="url" />
  </Fragment>
);

export default DirectorForm;
