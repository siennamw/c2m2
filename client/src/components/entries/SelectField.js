import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import Select from 'react-select';

import FieldInfoTooltip from './FieldInfoTooltip';
import { MODEL_NAMES } from '../../constants';

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
  const items = options
    .sort((a, b) => (
      (a.name || a.title).toLowerCase().localeCompare(
        (b.name || b.title).toLowerCase()
      )
    )).map(i => (
      { value: i.id, label: i.name || i.title }
    ));

  const selectedItems = Array.isArray(selected)
    ? items.filter(i => selected.includes(i.value))
    : items.find(i => i.value === selected);

  const content = (
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
        {addNewItemText ? 'select from the list below or click + to create a new entry' : undefined }
      </div>
      <Select
        name={fieldName}
        className="react-select"
        isDisabled={disabled}
        id={fieldName}
        isMulti={isMulti}
        onBlur={() => onBlur(fieldName)}
        onChange={evt => onChange(evt, fieldName)}
        options={items}
        styles={{
          container: (provided, state) => ({
            ...provided,
            borderWidth: '1px',
          }),
        }}
        theme={theme => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#0099F6',
            primary25: '#BBBBBB',
            primary50: '#999999',
            primary75: '#777777',
            neutral50: '#555555', // placeholder; darkened for contrast ratio
          },
        })}
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
  disabled: false,
  selected: null,
};

SelectField.propTypes = {
  addNewItemText: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  labelDisabled: PropTypes.bool,
  modelName: PropTypes.oneOf(MODEL_NAMES).isRequired,
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
          `Invalid ID in ${propFullName} supplied to ${componentName}. Validation failed.`
        );
      }

      if (!nameIsValid) {
        return new Error(
          `Invalid name in ${propFullName} supplied to ${componentName}. Validation failed.`
        );
      }
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
