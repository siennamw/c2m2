// based on Bogdan Soare, "How to use React’s new Context API to easily manage modals"
// https://medium.com/@BogdanSoare/how-to-use-reacts-new-context-api-to-easily-manage-modals-2ae45c7def81

import React, { useContext } from 'react';

import { ModalContext } from './ModalContext';

const ModalRoot = () => {
  const { component: Component, props, hideModal } = useContext(ModalContext);

  return Component
    ? <Component {...props} onRequestClose={hideModal} />
    : null;
};

export default ModalRoot;
