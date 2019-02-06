import React from 'react';
import { createContext } from 'react';

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

  hideModal = () => this.setState({
    component: null,
    props: {},
  });

  state = {
    component: null,
    props: {},
    showModal: this.showModal,
    hideModal: this.hideModal
  };

  render() {
    return (
      <ModalContext.Provider value={this.state}>
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}
