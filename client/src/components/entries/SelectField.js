import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

import FieldInfoTooltip from './FieldInfoTooltip';

const SelectField = ({
  fieldName,
  disabled,
  displayName,
  isMulti,
  onChangeCallback,
  options,
}) => {
  let content;

  // map results to <option> elements
  const items = options
    .map((i) => {
      const coercedID = isNaN(Number(i.id)) ? i.id : Number(i.id);
      return (
        <option key={coercedID} value={coercedID}>{i.name}</option>
      );
    });

  // multi vs. single (dropdown) select
  if (isMulti) {
    content = (
      <Field
        name={fieldName}
        className="u-full-width"
        component="select"
        disabled={disabled}
        multiple
        onChange={evt => onChangeCallback(evt, fieldName)}
      >
        {items}
      </Field>
    );
  } else {
    content = (
      <Field
        name={fieldName}
        className="u-full-width"
        component="select"
        disabled={disabled}
        onChange={evt => onChangeCallback(evt, fieldName)}
      >
        {items}
      </Field>
    );
  }

  return (
    <label htmlFor={fieldName}>
      {displayName}
      <FieldInfoTooltip field={fieldName} forMultiSelect={isMulti} hideRules />
      <ErrorMessage
        name={fieldName}
        component="div"
        className="status-message form-message error"
      />
      {content}
    </label>);
};

SelectField.defaultProps = {
  isMulti: false,
  disabled: false,
};

SelectField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  onChangeCallback: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
};

export default SelectField;
