import React from 'react';
import { Form } from 'formik';
import InputField from '../InputField';

import { LIST_ALL_REPOSITORIES } from '../../../queries';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import NewRepository from '../repository/NewRepository';

const CollectionForm = ({
  handleSubmit, isSubmitting, isValid, status, setFieldValue
}) => {
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
    <Form>
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
      <button
        type="submit"
        className="button-primary u-full-width"
        disabled={isSubmitting || !isValid}
        onClick={handleSubmit}
      >
        Submit
      </button>
      {
        status
          ? <div className={`status-message ${status.type}`}>{status.message}</div>
          : undefined
      }
    </Form>
  );
};

export default CollectionForm;
