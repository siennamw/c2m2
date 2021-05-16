import React, { Fragment } from 'react';
import InputField from '../InputField';

const MaterialFormatFormFields = () => {
  const model = 'material_format';
  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        modelName={model}
      />
      <InputField
        component="textarea"
        displayName="Description"
        fieldName="description"
        modelName={model}
      />
    </Fragment>
  );
};

export default MaterialFormatFormFields;
