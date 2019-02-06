import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Query } from 'react-apollo';
import Modal from 'react-modal';

import { ModalConsumer } from '../modal/ModalContext';

const SelectFieldWithQuery = ({
  fieldName, displayName, isMulti, onChangeCallback, query, queryName, componentForModal
}) => {
  return (
    <Query query={query}>
      {({ error, data }) => {
        let content = (
          <div className="form-message api-message warn">Fetching...</div>
        );

        if (error) {
          content = (
            <div className="form-message api-message error">
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

        const tooltip = `Add New ${displayName}`;

        // modal for creating a new entry in this category
        const modal = ({ onRequestClose, ...otherProps }) => (
          <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
            <button onClick={onRequestClose}>close</button>
            {componentForModal}
          </Modal>
        );

        return (
          <div className="select-with-query">
            <label htmlFor={fieldName}>
              {displayName}
              <ErrorMessage
                name={fieldName}
                component="div"
                className="form-message error"
              />
            </label>
            {content}
            <ModalConsumer>
              {({ showModal }) => (
                <button
                  type="button"
                  onClick={() => showModal(modal)}
                  className="button-primary"
                  title={tooltip}
                >
                  +
                </button>
              )}
            </ModalConsumer>
          </div>
        );
      }}
    </Query>
  )
};

export default SelectFieldWithQuery;
