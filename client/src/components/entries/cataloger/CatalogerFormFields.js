import PropTypes from 'prop-types';
import React, { Fragment, useContext } from 'react';
import { useFormikContext } from 'formik';

import InputField from '../InputField';
import SelectField from '../SelectField';
import { reactSelectOnChange } from '../../../utils';
import { AuthContext } from '../../AuthContext';

const CatalogerFormFields = ({ hidePasswordFields }) => {
  const {
    setFieldTouched,
    setFieldValue,
    values,
  } = useFormikContext();
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
        disabled={disabled}
        displayName="Email"
        fieldName="email"
        fieldType="email"
        modelName={model}
      />
      <InputField
        component="textarea"
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
      {
        entryIsSelf && !hidePasswordFields
          ? (
            <Fragment>
              <InputField
                disabled={disabled}
                displayName="Password"
                fieldName="password"
                fieldType="password"
                modelName={model}
              />
              <InputField
                disabled={disabled}
                displayName="New Password (leave blank if no change)"
                fieldName="new_password"
                fieldType="password"
                modelName={model}
              />
            </Fragment>
          )
          : undefined
      }
    </Fragment>
  );
};

CatalogerFormFields.propTypes = {
  hidePasswordFields: PropTypes.bool,
};

CatalogerFormFields.defaultProps = {
  hidePasswordFields: false,
};

export const CatalogerFormFieldsNoPasswords = () => (
  <CatalogerFormFields hidePasswordFields />
);

export default CatalogerFormFields;
