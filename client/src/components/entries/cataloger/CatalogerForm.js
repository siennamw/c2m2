import React, { Fragment } from 'react';
import InputField from '../InputField';

const CatalogerForm = () => (
  <Fragment>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="Email" fieldName="email" fieldType="email" />
    <InputField displayName="Description" fieldName="description" />
    <InputField displayName="Password" fieldName="password" fieldType="password" />
  </Fragment>
);

export default CatalogerForm;
