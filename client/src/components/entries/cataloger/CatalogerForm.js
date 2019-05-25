import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import InputField from '../InputField';
import SelectField from '../SelectField';

const CatalogerForm = ({ entryIsSelf, selfIsAdmin, setFieldValue }) => {
  const selectOnChange = (evt, name) => {
    setFieldValue(name, evt.target.value);
  };

  const disabled = !selfIsAdmin && !entryIsSelf;

  return (
    <Fragment>
      <InputField
        displayName="Name"
        fieldName="name"
        disabled={disabled}
      />
      <InputField
        displayName="Description"
        fieldName="description"
        disabled={disabled}
      />
      <SelectField
        onChangeCallback={selectOnChange}
        fieldName="admin"
        disabled={!selfIsAdmin}
        disablePlaceholder
        displayName="Admin?"
        options={[
          { id: true, name: 'Yes' },
          { id: false, name: 'No' },
        ]}
      />
      <InputField
        disabled={disabled}
        displayName="Email"
        fieldName="email"
        fieldType="email"
      />
      <InputField
        disabled={disabled}
        displayName="Password"
        fieldName="password"
        fieldType="password"
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
