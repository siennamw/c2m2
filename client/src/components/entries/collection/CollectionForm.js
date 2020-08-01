import React, { Fragment } from 'react';
import { useFormikContext } from 'formik';

import InputField from '../InputField';
import SelectFieldWithQuery from '../SelectFieldWithQuery';
import NewRepository from '../repository/NewRepository';

import { LIST_ALL_REPOSITORIES } from '../../../queries';
import { reactSelectOnChange } from '../../../utils';

const CollectionForm = () => {
  const {
    setFieldTouched,
    setFieldValue,
    values,
  } = useFormikContext();

  const model = 'collection';

  const selectOnBlur = (field) => {
    setFieldTouched(field, true);
  };

  const selectOnChange = (evt, name) => {
    reactSelectOnChange(evt, name, setFieldValue);
  };

  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        modelName={model}
      />
      <SelectFieldWithQuery
        componentForModal={NewRepository}
        displayName="Repository"
        fieldName="repository_id"
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={LIST_ALL_REPOSITORIES}
        queryName="allRepositories"
        selected={values.repository_id}
      />
      <InputField
        displayName="Finding Aid Link"
        fieldName="finding_aid_link"
        fieldType="url"
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

export default CollectionForm;
