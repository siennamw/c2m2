import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { unregister } from './registerServiceWorker';

import './styles/index.css';
import App from './components/App';
import ScrollToTop from './components/ScrollToTop';

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <App />
  </Router>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
);

unregister();
