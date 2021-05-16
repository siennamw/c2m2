import React, { Fragment } from 'react';
import InputField from '../InputField';

const ComposerFormFields = () => {
  const model = 'composer';
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

export default ComposerFormFields;
