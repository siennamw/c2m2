import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import ModalForComponentWithButton from './ModalForComponentWithButton';
import SelectField from './SelectField';
import StatusMessage from '../StatusMessage';

import { MODEL_NAMES } from '../../constants';
import * as queries from '../../queries';

const SelectFieldWithQuery = ({
  componentForModal,
  disableAddButton,
  disabled,
  displayName,
  fieldName,
  isMulti,
  modelName,
  onBlur,
  onChange,
  query,
  queryName,
  selected,
}) => {
  const {
    data,
    error,
    refetch,
  } = useQuery(query);

  const showButton = componentForModal && !disableAddButton;

  let content = (
    <StatusMessage message="Fetching..." />
  );

  if (error) {
    content = (
      <StatusMessage
        message="Sorry! There was an error fetching data."
        type="error"
      />
    );
  } else if (data && data[queryName]) {
    content = (
      <SelectField
        addNewItemText={showButton}
        fieldName={fieldName}
        disabled={disabled}
        displayName={displayName}
        isMulti={isMulti}
        labelDisabled
        modelName={modelName}
        onBlur={onBlur}
        onChange={onChange}
        options={data[queryName]}
        selected={selected}
      />
    );
  }

  const updateOnCloseModal = (modalData) => {
    refetch();

    if (modalData && modalData.id) {
      // call onChange with data from modal
      if (isMulti) {
        const vals = [
          ...selected,
          modalData.id,
        ];
        onChange(vals.map((itemId) => ({ value: itemId })), fieldName);
      } else {
        onChange({ value: modalData.id }, fieldName);
      }
    }
  };

  let classes = 'select-with-query';
  if (showButton) {
    classes = `${classes} has-button`;
  }

  return (
    <div className={classes}>
      <label htmlFor={fieldName}>
        {content}
        {
          showButton
            ? (
              <ModalForComponentWithButton
                component={componentForModal}
                displayName={displayName}
                onClose={updateOnCloseModal}
              />
            )
            : undefined
        }
      </label>
    </div>
  );
};

SelectFieldWithQuery.defaultProps = {
  componentForModal: null,
  disableAddButton: false,
  disabled: false,
  isMulti: false,
  selected: null,
};

SelectFieldWithQuery.propTypes = {
  fieldName: PropTypes.string.isRequired,
  componentForModal: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  disableAddButton: PropTypes.bool,
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  modelName: PropTypes.oneOf(MODEL_NAMES).isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.oneOf(Object.values(queries)).isRequired,
  queryName: PropTypes.string.isRequired,
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

export default SelectFieldWithQuery;
