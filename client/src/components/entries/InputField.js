import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

import FieldInfoTooltip from './FieldInfoTooltip';

const InputField = ({ disabled, displayName, fieldName, fieldType }) => {
  const autoComplete = {
    password: 'new-password',
    email: 'email',
  };

  return (
    <label htmlFor={fieldName}>
      {displayName}
      <FieldInfoTooltip field={fieldName} />
      <ErrorMessage
        name={fieldName}
        component="div"
        className="status-message form-message error"
      />
      <Field
        disabled={disabled}
        id={fieldName}
        type={fieldType}
        name={fieldName}
        className="u-full-width"
        autoComplete={autoComplete[fieldType]}
      />
    </label>
  );
};

InputField.defaultProps = {
  disabled: false,
  fieldType: 'text',
};

InputField.propTypes = {
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.oneOf(['text', 'url', 'password', 'email', 'number']),
};

export default InputField;
