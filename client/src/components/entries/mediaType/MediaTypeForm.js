import React, { Fragment } from 'react';
import InputField from '../InputField';

const MediaTypeForm = () => {
  const model = 'media_type';
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

export default MediaTypeForm;
