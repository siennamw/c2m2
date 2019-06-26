import React, { Fragment } from 'react';
import InputField from '../InputField';

const RepositoryForm = () => {
  const model = 'repository';
  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        modelName={model}
      />
      <InputField
        displayName="Location"
        fieldName="location"
        modelName={model}
      />
      <InputField
        displayName="Website"
        fieldName="website"
        fieldType="url"
        modelName={model}
      />
    </Fragment>
  );
};

export default RepositoryForm;
