import React from 'react';
import { Redirect } from 'react-router-dom';

import { withApollo } from 'react-apollo';

import { isAuthenticated, signOut } from "../../utils";

class CatalogerSignOut extends React.Component {
  state = {
    authenticated: isAuthenticated(),
    err: null,
  };

  async componentDidMount() {
    try {
      await this.props.client.resetStore();
    } catch (err) {
      this.setState({ ...this.state, err });
      console.log('Error signing out', err);
    }

    signOut();
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
