// based on Bogdan Soare, "How to use React’s new Context API to easily manage modals"
// https://medium.com/@BogdanSoare/how-to-use-reacts-new-context-api-to-easily-manage-modals-2ae45c7def81

import React, { createContext } from 'react';

export const ModalContext = createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
});

export const ModalConsumer = ModalContext.Consumer;

export class ModalProvider extends React.Component {
  showModal = (component, props = {}) => {
    this.setState({
      component,
      props
    });
  };

  hideModal = () => {
    this.setState({
      component: null,
      props: {},
    });
  };

  state = {
    component: null,
    props: {},
    showModal: this.showModal,
    hideModal: this.hideModal,
  };

  render() {
    return (
      <ModalContext.Provider value={this.state}>
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}
