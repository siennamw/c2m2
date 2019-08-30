import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from 'formik';
import Select from 'react-select';

import FieldInfoTooltip from './FieldInfoTooltip';
import { MODEL_NAMES } from '../../constants';

export const SelectFieldNoLabel = ({
  addNewItemText,
  fieldName,
  disabled,
  displayName,
  isMulti,
  modelName,
  onChangeCallback,
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
        {addNewItemText ? 'select from the list below or click + to create a new entry' : undefined }
      </div>
      <Select
        name={fieldName}
        className="react-select"
        disabled={disabled}
        isMulti={isMulti}
        onChange={evt => onChangeCallback(evt, fieldName)}
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
          },
        })}
        value={selectedItems}
      />
    </Fragment>
  );
};

SelectFieldNoLabel.defaultProps = {
  addNewItemText: false,
  isMulti: false,
  disabled: false,
  selected: null,
};

SelectFieldNoLabel.propTypes = {
  addNewItemText: PropTypes.bool,
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  modelName: PropTypes.oneOf(MODEL_NAMES).isRequired,
  onChangeCallback: PropTypes.func.isRequired,
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

const SelectField = ({
  fieldName,
  disabled,
  displayName,
  isMulti,
  modelName,
  onChangeCallback,
  options,
  selected,
}) => (
  <label htmlFor={fieldName}>
    <SelectFieldNoLabel
      fieldName={fieldName}
      disabled={disabled}
      displayName={displayName}
      isMulti={isMulti}
      modelName={modelName}
      onChangeCallback={onChangeCallback}
      options={options}
      selected={selected}
    />
  </label>
);

SelectField.defaultProps = {
  isMulti: false,
  disabled: false,
  selected: null,
};

SelectField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
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
