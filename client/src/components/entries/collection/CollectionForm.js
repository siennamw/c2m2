import React, { Fragment } from 'react';
import InputField from '../InputField';

import { LIST_ALL_REPOSITORIES } from '../../../queries';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import NewRepository from '../repository/NewRepository';

const CollectionForm = ({ setFieldValue }) => {
  const selectOnChange = (evt, name) => {
    // when selecting from a dropdown to set an ID,
    // coerce value to number on change
    if (name.includes('_id')) {
      setFieldValue(
        name,
        Number(evt.target.value),
      );
    }
  };

  return (
    <Fragment>
      <InputField displayName="Name" fieldName="name" />
      <SelectFieldWithQuery
        displayName="Repository"
        fieldName="repository_id"
        onChangeCallback={selectOnChange}
        query={LIST_ALL_REPOSITORIES}
        queryName="allRepositories"
        componentForModal={<NewRepository />}
      />
      <InputField displayName="Description" fieldName="description" />
    </Fragment>
  );
};

export default CollectionForm;
