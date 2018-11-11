import React from 'react';
import { Redirect } from 'react-router-dom';

import { withApollo } from 'react-apollo';

import * as constants from '../../constants';
import { isAuthenticated } from "../../utils";

class CatalogerSignOut extends React.Component {
  state = {
    authenticated: isAuthenticated(),
    err: null,
  };

  async componentDidMount() {
    try {
      await this.props.client.resetStore();
      localStorage.removeItem(constants.LOCAL_STORAGE_KEY);
    } catch (err) {
      this.setState({ ...this.state, err });
      console.log('Error signing out', err);
    }

    this.setState({ ...this.state, authenticated: isAuthenticated() });
  }

  render = () => {
    if (this.state.err) {
      return (
        <div>
          <h3>Error Signing Out</h3>
          <p>{this.state.err}</p>
        </div>
      );
    }

    if (this.state.authenticated) return <h3>Signing out...</h3>;

    return <Redirect to="/" />;
  }
}

export default withApollo(CatalogerSignOut);
