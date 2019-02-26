import React, { Fragment } from 'react';
import InputField from '../InputField';

const ProductionCompanyForm = () => (
  <Fragment>
    <InputField displayName="Name" fieldName="name" />
    <InputField displayName="Contact Information" fieldName="contact_info" />
  </Fragment>
);

export default ProductionCompanyForm;
