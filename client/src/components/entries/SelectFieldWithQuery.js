import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { MODEL_NAMES } from '../../constants';
import { SelectFieldNoLabel } from './SelectField';
import ModalForComponent from './ModalForComponent';

const SelectFieldWithQuery = ({
  fieldName,
  componentForModal,
  disabled,
  displayName,
  isMulti,
  modelName,
  onChangeCallback,
  query,
  queryName,
}) => (
  <Query query={query}>
    {({ error, data, refetch }) => {
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
          <SelectFieldNoLabel
            fieldName={fieldName}
            disabled={disabled}
            displayName={displayName}
            isMulti={isMulti}
            modelName={modelName}
            onChangeCallback={onChangeCallback}
            options={data[queryName]}
          />
        );
      }

      const updateOnCloseModal = (onClose) => {
        onClose();
        refetch();
      };

      return (
        <div className="select-with-query">
          <label htmlFor={fieldName}>
            {content}
            <ModalForComponent
              component={componentForModal}
              displayName={displayName}
              onClose={updateOnCloseModal}
            />
          </label>
        </div>
      );
    }}
  </Query>
);

SelectFieldWithQuery.defaultProps = {
  disabled: false,
  isMulti: false,
};

SelectFieldWithQuery.propTypes = {
  fieldName: PropTypes.string.isRequired,
  componentForModal: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  disabled: PropTypes.bool,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  modelName: PropTypes.oneOf(MODEL_NAMES).isRequired,
  onChangeCallback: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  queryName: PropTypes.string.isRequired,
};

export default SelectFieldWithQuery;
