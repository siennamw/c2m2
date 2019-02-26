import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

import FieldInfoTooltip from './FieldInfoTooltip';

const InputField = ({ displayName, fieldName, fieldType }) => {
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
  fieldType: 'text',
};

InputField.propTypes = {
  displayName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.oneOf(['text', 'url', 'password', 'email', 'number']),
};

export default InputField;
