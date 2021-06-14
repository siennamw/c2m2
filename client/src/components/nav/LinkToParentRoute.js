import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import React from 'react';

const LinkToParentRoute = () => {
  const location = useLocation();
  const match = useRouteMatch();

  // add back arrow to root path for all but root path
  return match.path !== location.pathname
    ? <Link to={`${match.path}`}>&larr; Back</Link>
    : null
};

export default LinkToParentRoute;
