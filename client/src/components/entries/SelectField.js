import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import Select from 'react-select';

import FieldInfoTooltip from './FieldInfoTooltip';
import { MODEL_NAMES } from '../../constants';

export const StyledSelect = ({
  disabled,
  fieldName,
  id,
  isMulti,
  options,
  onBlur,
  onChange,
  value,
}) => (
  <Select
    name={fieldName}
    className="react-select"
    isDisabled={disabled}
    id={id}
    isMulti={isMulti}
    onBlur={onBlur}
    onChange={onChange}
    options={options}
    styles={{
      container: (provided) => ({
        ...provided,
        borderWidth: '1px',
      }),
    }}
    theme={(theme) => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#0099F6',
        primary25: '#BBBBBB',
        primary50: '#999999',
        primary75: '#777777',
        neutral50: '#333333', // placeholder; darkened for contrast ratio
      },
    })}
    value={value}
  />
);

StyledSelect.propTypes = {
  disabled: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]).isRequired,
    }).isRequired,
  ).isRequired,
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.bool,
        ]),
      }),
    ),
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]),
    }),
  ]),
};

StyledSelect.defaultProps = {
  disabled: false,
  isMulti: false,
  value: null,
};


const SelectField = ({
  addNewItemText,
  fieldName,
  disabled,
  displayName,
  isMulti,
  labelDisabled,
  modelName,
  onBlur,
  onChange,
  options,
  selected,
}) => {
  const items = options.map((i) => ({ value: i.id, label: i.name || i.title }));

  if (!isMulti) {
    // placeholder & empty value for reset
    items.unshift({ value: '', label: 'Select...' });
  }

  const selectedItems = Array.isArray(selected)
    ? items.filter((i) => selected.includes(i.value))
    : items.find((i) => i.value === selected);

  const content = (
    <Fragment>
      {displayName}
      {
        modelName
          ? (
            <FieldInfoTooltip
              field={fieldName}
              model={modelName}
            />
          )
          : null
      }

      <ErrorMessage
        name={fieldName}
        component="div"
        className="status-message form-message error"
      />
      <div className="help-text">
        {
          addNewItemText
            ? 'choose from the list below or click + to create a new entry'
            : undefined
        }
      </div>
      <StyledSelect
        disabled={disabled}
        fieldName={fieldName}
        id={fieldName}
        isMulti={isMulti}
        onBlur={() => onBlur(fieldName)}
        onChange={(evt) => onChange(evt, fieldName)}
        options={items}
        value={selectedItems}
      />
    </Fragment>
  );

  return labelDisabled
    ? content
    : (
      <label htmlFor={fieldName}>
        { content }
      </label>
    );
};

SelectField.defaultProps = {
  addNewItemText: false,
  isMulti: false,
  labelDisabled: false,
  modelName: null,
  disabled: false,
  selected: null,
};

SelectField.propTypes = {
  addNewItemText: PropTypes.bool,
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  labelDisabled: PropTypes.bool,
  modelName: PropTypes.oneOf(MODEL_NAMES),
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      const idType = typeof propValue[key].id;

      const idIsValid = idType === 'string'
        || idType === 'boolean'
        || idType === 'number';

      let nameIsValid;
      if (propValue[key].name || propValue[key].title) {
        const nameType = typeof (propValue[key].name || propValue[key].title);
        nameIsValid = nameType === 'string';
      } else {
        nameIsValid = false;
      }

      if (!idIsValid) {
        return new Error(
          `Invalid ID in ${propFullName} supplied to ${componentName}. Validation failed.`,
        );
      }

      if (!nameIsValid) {
        return new Error(
          `Invalid name in ${propFullName} supplied to ${componentName}. Validation failed.`,
        );
      }

      return true;
    },
  ).isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
      ]),
    ),
    PropTypes.string,
    PropTypes.bool,
  ]),
};

export default SelectField;
