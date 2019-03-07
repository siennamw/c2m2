import React from 'react';
import PropTypes from 'prop-types';
import { Field, ErrorMessage } from 'formik';
import { Query } from 'react-apollo';
import Modal from 'react-modal';

import { ModalConsumer } from '../modal/ModalContext';
import FieldInfoTooltip from './FieldInfoTooltip';

const SelectFieldWithQuery = ({
  fieldName,
  componentForModal,
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
        // sort alphabetically and map results to <option> elements
        const items = data[queryName].sort((a, b) => (
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )).map(i => (
          <option key={i.id} value={Number(i.id)}>{i.name}</option>
        ));

        // multi vs. single (dropdown) select
        if (isMulti) {
          content = (
            <Field
              name={fieldName}
              className="u-full-width"
              component="select"
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
              onChange={evt => onChangeCallback(evt, fieldName)}
            >
              <option key="none" value="">Select</option>
              {items}
            </Field>
          );
        }
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
            {displayName}
            <FieldInfoTooltip field={fieldName} forMultiSelect={isMulti} hideRules />
            <ErrorMessage
              name={fieldName}
              component="div"
              className="status-message form-message error"
            />
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
  isMulti: false,
};

SelectFieldWithQuery.propTypes = {
  fieldName: PropTypes.string.isRequired,
  componentForModal: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  displayName: PropTypes.string.isRequired,
  isMulti: PropTypes.bool,
  onChangeCallback: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
  queryName: PropTypes.string.isRequired,
};

export default SelectFieldWithQuery;
