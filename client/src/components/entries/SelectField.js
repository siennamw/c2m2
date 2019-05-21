import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

import FieldInfoTooltip from './FieldInfoTooltip';

export const SelectFieldNoLabel = ({
  fieldName,
  disabled,
  displayName,
  isMulti,
  onChangeCallback,
  options,
}) => {
  let content;

  // sort and map options to <option> elements
  const items = options
    .sort((a, b) => (
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    )).map(i => (
      <option key={i.id} value={i.id}>{i.name}</option>
    ));

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
    <Fragment>
      {displayName}
      <FieldInfoTooltip field={fieldName} forMultiSelect={isMulti} hideRules />
      <ErrorMessage
        name={fieldName}
        component="div"
        className="status-message form-message error"
      />
      {content}
    </Fragment>
  );
};

SelectFieldNoLabel.defaultProps = {
  isMulti: false,
  disabled: false,
};

SelectFieldNoLabel.propTypes = {
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
    })
  ).isRequired,
};

const SelectField = ({
  fieldName,
  disabled,
  displayName,
  isMulti,
  onChangeCallback,
  options,
}) => (
  <label htmlFor={fieldName}>
    <SelectFieldNoLabel
      fieldName={fieldName}
      disabled={disabled}
      displayName={displayName}
      isMulti={isMulti}
      onChangeCallback={onChangeCallback}
      options={options}
    />
  </label>
);

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
    })
  ).isRequired,
};

export default SelectField;
