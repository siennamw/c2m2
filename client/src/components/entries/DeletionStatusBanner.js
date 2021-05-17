import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../AuthContext';

const DeletionStatusBanner = ({ deleted }) => {
  const { authenticated } = useContext(AuthContext);
  
  if (!authenticated || !deleted) {
    return null;
  }

  return (
    <div className={`deletion-status bar deleted`}>
      <span className="h3">
        Deleted
      </span>
      <span>
        This record has been deleted and and can only be viewed by catalogers.
      </span>
    </div>
  );
};

DeletionStatusBanner.defaultProps = {
  deleted: null,
};

DeletionStatusBanner.propTypes = {
  deleted: PropTypes.bool,
};

export default DeletionStatusBanner;
