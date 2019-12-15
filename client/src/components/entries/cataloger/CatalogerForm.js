import React, { Fragment, useContext } from 'react';

import InputField from '../InputField';
import SelectField from '../SelectField';
import { reactSelectOnChange } from '../../../utils';
import { AuthContext } from '../../AuthContext';

const CatalogerForm = ({ setFieldTouched, setFieldValue, values }) => {
  const { admin, id } = useContext(AuthContext);

  const model = 'cataloger';

  const selectOnBlur = (field) => {
    setFieldTouched(field, true);
  };

  const selectOnChange = (evt, name) => {
    reactSelectOnChange(evt, name, setFieldValue);
  };

  const entryIsSelf = Number(values.id) === id;
  const disabled = !admin && !entryIsSelf;

  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        disabled={disabled}
        modelName={model}
      />
      <InputField
        displayName="Description"
        fieldName="description"
        disabled={disabled}
        modelName={model}
      />
      <SelectField
        disabled={!admin}
        displayName="Admin?"
        fieldName="admin"
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        options={[
          { id: true, name: 'Yes' },
          { id: false, name: 'No' },
        ]}
        selected={values.admin}
      />
      <InputField
        disabled={disabled}
        displayName="Email"
        fieldName="email"
        fieldType="email"
        modelName={model}
      />
      <InputField
        disabled={disabled}
        displayName="Password"
        fieldName="password"
        fieldType="password"
        modelName={model}
      />
    </Fragment>
  );
};

export default CatalogerForm;
