import React, { Fragment } from 'react';
import InputField from '../InputField';

import { LIST_ALL_REPOSITORIES } from '../../../queries';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import NewRepository from '../repository/NewRepository';

const CollectionForm = ({ setFieldValue }) => {
  const model = 'collection';

  const selectOnChange = (evt, name) => {
    // when selecting from a dropdown to set an ID
    if (name.includes('_id')) {
      setFieldValue(
        name,
        evt.target.value,
      );
    }
  };

  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        modelName={model}
      />
      <SelectFieldWithQuery
        componentForModal={<NewRepository />}
        displayName="Repository"
        fieldName="repository_id"
        modelName={model}
        onChangeCallback={selectOnChange}
        query={LIST_ALL_REPOSITORIES}
        queryName="allRepositories"
      />
      <InputField
        displayName="Description"
        fieldName="description"
        modelName={model}
      />
    </Fragment>
  );
};

export default CollectionForm;
