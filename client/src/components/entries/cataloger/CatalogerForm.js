import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import InputField from '../InputField';
import SelectField from '../SelectField';
import { reactSelectOnChange } from '../../../utils';

const CatalogerForm = ({ entryIsSelf, selfIsAdmin, setFieldValue, values }) => {
  const model = 'cataloger';

  const selectOnChange = (evt, name) => {
    reactSelectOnChange(evt, name, setFieldValue);
  };

  const disabled = !selfIsAdmin && !entryIsSelf;

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
        disabled={!selfIsAdmin}
        displayName="Admin?"
        fieldName="admin"
        modelName={model}
        onChangeCallback={selectOnChange}
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

CatalogerForm.defaultProps = {
  entryIsSelf: false,
  selfIsAdmin: false,
};

CatalogerForm.propTypes = {
  entryIsSelf: PropTypes.bool,
  selfIsAdmin: PropTypes.bool,
};

export default CatalogerForm;
