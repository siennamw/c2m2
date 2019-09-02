import React from 'react';
import PropTypes from 'prop-types';
import { Query } from '@apollo/react-components';

import { MODEL_NAMES } from '../../constants';
import SelectField from './SelectField';
import ModalForComponentWithButton from './ModalForComponentWithButton';

const SelectFieldWithQuery = ({
  fieldName,
  componentForModal,
  disableAddButton,
  disabled,
  displayName,
  isMulti,
  modelName,
  onBlur,
  onChange,
  query,
  queryName,
  selected,
}) => (
  <Query query={query}>
    {({ error, data, refetch }) => {
      const showButton = componentForModal && !disableAddButton;

      let content = (
        <div className="status-message">Fetching...</div>
      );

      if (error) {
        content = (
          <div className="status-message error">
            Sorry! There was an error fetching data.
          </div>
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

      const updateOnCloseModal = (onClose) => {
        onClose();
        refetch();
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
    }}
  </Query>
);

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
  query: PropTypes.object.isRequired,
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
