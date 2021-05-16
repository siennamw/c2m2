import React, { Fragment } from 'react';
import InputField from '../InputField';

const ProductionCompanyFormFields = () => {
  const model = 'production_company';
  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        modelName={model}
      />
      <InputField
        displayName="Contact Information"
        fieldName="contact_info"
        modelName={model}
      />
    </Fragment>
  );
};

export default ProductionCompanyFormFields;
