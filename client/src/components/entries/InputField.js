import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

import FieldInfoTooltip from './FieldInfoTooltip';
import { MODEL_NAMES } from '../../constants';

const InputField = ({
  component,
  disabled,
  displayName,
  fieldName,
  fieldType,
  modelName,
}) => {
  const autoComplete = {
    password: 'new-password',
    email: 'email',
  };

  return (
    <label htmlFor={fieldName}>
      {displayName}
      {
        modelName
          ? <FieldInfoTooltip field={fieldName} model={modelName} />
          : null
      }
      <ErrorMessage
        name={fieldName}
        component="div"
        className="status-message form-message error"
      />
      <Field
        component={component}
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
  component: null,
  disabled: false,
  fieldType: 'text',
  modelName: null,
};

InputField.propTypes = {
  component: PropTypes.string,
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  fieldType: PropTypes.oneOf(['text', 'url', 'password', 'email', 'number']),
  modelName: PropTypes.oneOf(MODEL_NAMES),
};

export default InputField;
