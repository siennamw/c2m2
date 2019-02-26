// based on Bogdan Soare, "How to use React’s new Context API to easily manage modals"
// https://medium.com/@BogdanSoare/how-to-use-reacts-new-context-api-to-easily-manage-modals-2ae45c7def81

import React from 'react';

import { ModalConsumer } from './ModalContext';

const ModalRoot = () => (
  <ModalConsumer>
    {({ component: Component, props, hideModal }) => (
      Component ? <Component {...props} onRequestClose={hideModal} /> : null
    )}
  </ModalConsumer>
);

export default ModalRoot;
