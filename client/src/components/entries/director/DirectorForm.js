import React, { Fragment } from 'react';
import InputField from '../InputField';

const DirectorForm = () => {
  const model = 'director';
  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        modelName={model}
      />
      <InputField
        displayName="IMDB Link"
        fieldName="imdb_link"
        fieldType="url"
        modelName={model}
      />
    </Fragment>
  );
};

export default DirectorForm;
