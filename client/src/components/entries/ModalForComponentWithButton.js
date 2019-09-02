import React, { useContext } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

import { ModalContext } from '../modal/ModalContext';

// for accessibility,
// https://github.com/reactjs/react-modal/tree/master/docs/accessibility
Modal.setAppElement('#root');

const ModalForComponentWithButton = ({
  component,
  displayName,
  onClose,
}) => {
  // modal for creating a new entry in this category
  const modal = ({ onRequestClose }) => (
    <Modal
      className="custom-modal"
      isOpen
      onRequestClose={() => onClose(onRequestClose)}
      overlayClassName="custom-modal-overlay"
    >
      <button
        className="custom-modal-x"
        onClick={() => onClose(onRequestClose)}
        type="button"
      >
        x
      </button>
      {component}
    </Modal>
  );

  const { showModal } = useContext(ModalContext);

  return (
    <button
      className="button-primary"
      onClick={() => showModal(modal)}
      title={`Add New ${displayName}`}
      type="button"
    >
      +
    </button>
  );
};

ModalForComponentWithButton.defaultProps = {
  displayName: 'Entry',
};

ModalForComponentWithButton.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  displayName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ModalForComponentWithButton;
