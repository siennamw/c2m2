import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';

import FieldInfoTooltip from './FieldInfoTooltip';
import { MODEL_NAMES } from '../../constants';

export const SelectFieldNoLabel = ({
  addNewItemText,
  fieldName,
  disabled,
  disablePlaceholder,
  displayName,
  isMulti,
  modelName,
  onChangeCallback,
  options,
}) => {
  let content;

  // sort and map options to <option> elements
  const items = options
    .sort((a, b) => (
      (a.name || a.title).toLowerCase().localeCompare(
        (b.name || b.title).toLowerCase()
      )
    )).map(i => (
      <option key={i.id} value={i.id}>{i.name || i.title}</option>
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
        {
          disablePlaceholder
            ? undefined
            : <option key="placeholder" value="">Select</option>
        }
        {items}
      </Field>
    );
  }

  const helpText = [];
  if (addNewItemText) {
    helpText.push('select from the list below or click + to create a new entry');
  }
  if (isMulti) {
    helpText.push('hold ctrl/cmd to select more than one item');
  }

  return (
    <Fragment>
      {displayName}
      <FieldInfoTooltip
        field={fieldName}
        model={modelName}
      />
      <ErrorMessage
        name={fieldName}
        component="div"
        className="status-message form-message error"
      />
      <div className="help-text">
        {helpText.map((text, index) => <div key={index}>{text}</div>)}
      </div>
      {content}
    </Fragment>
  );
};

SelectFieldNoLabel.defaultProps = {
  addNewItemText: false,
  isMulti: false,
  disabled: false,
  disablePlaceholder: false,
};

SelectFieldNoLabel.propTypes = {
  addNewItemText: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  disablePlaceholder: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  modelName: PropTypes.oneOf(MODEL_NAMES).isRequired,
  onChangeCallback: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      let idIsValid;
      if (propValue[key].id) {
        const idType = typeof propValue[key].id;
        idIsValid = idType === 'string'
          || idType === 'boolean'
          || idType === 'number';
      } else {
        idIsValid = false;
      }

      let nameIsValid;
      if (propValue[key].name || propValue[key].title) {
        const nameType = typeof (propValue[key].name || propValue[key].title);
        nameIsValid = nameType === 'string';
      } else {
        nameIsValid = false;
      }

      const valid = idIsValid && nameIsValid;
      if (!valid) {
        return new Error(
          'Invalid prop `' + propFullName + '` supplied to' +
          ' `' + componentName + '`. Validation failed.'
        );
      }
    },
  ).isRequired,
};

const SelectField = ({
  fieldName,
  disabled,
  disablePlaceholder,
  displayName,
  isMulti,
  modelName,
  onChangeCallback,
  options,
}) => (
  <label htmlFor={fieldName}>
    <SelectFieldNoLabel
      fieldName={fieldName}
      disabled={disabled}
      disablePlaceholder={disablePlaceholder}
      displayName={displayName}
      isMulti={isMulti}
      modelName={modelName}
      onChangeCallback={onChangeCallback}
      options={options}
    />
  </label>
);

SelectField.defaultProps = {
  isMulti: false,
  disabled: false,
  disablePlaceholder: false,
};

SelectField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  disablePlaceholder: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  modelName: PropTypes.oneOf(MODEL_NAMES).isRequired,
  onChangeCallback: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SelectField;
