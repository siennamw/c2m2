import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Modal from 'react-modal';

import { ModalConsumer } from '../modal/ModalContext';
import { SelectFieldNoLabel } from './SelectField';

// for accessibility,
// https://github.com/reactjs/react-modal/tree/master/docs/accessibility
Modal.setAppElement('#root');

const SelectFieldWithQuery = ({
  fieldName,
  componentForModal,
  disabled,
  displayName,
  isMulti,
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
            onChangeCallback={onChangeCallback}
            options={data[queryName]}
          />
        );
      }

      const updateOnCloseModal = (onClose) => {
        onClose();
        refetch();
      };

      // modal for creating a new entry in this category
      const modal = ({ onRequestClose, ...otherProps }) => (
        <Modal
          isOpen
          onRequestClose={() => updateOnCloseModal(onRequestClose)}
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
          {...otherProps}
        >
          <button
            type="button"
            onClick={() => updateOnCloseModal(onRequestClose)}
            className="custom-modal-x"
          >
            x
          </button>
          {componentForModal}
          <button
            type="button"
            onClick={() => updateOnCloseModal(onRequestClose)}
            className="u-full-width custom-modal-cancel-button"
          >
            Cancel
          </button>
        </Modal>
      );

      return (
        <div className="select-with-query">
          <label htmlFor={fieldName}>
            {content}
            <ModalConsumer>
              {({ showModal }) => (
                <button
                  type="button"
                  onClick={() => showModal(modal)}
                  className="button-primary"
                  title={`Add New ${displayName}`}
                >
                  +
                </button>
              )}
            </ModalConsumer>
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
  onChangeCallback: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  queryName: PropTypes.string.isRequired,
};

export default SelectFieldWithQuery;
