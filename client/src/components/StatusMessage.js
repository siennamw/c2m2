import React from 'react';
import PropTypes from 'prop-types';

const StatusMessage = ({ fade, message, type }) => {
  if (!type || !message) {
    return null;
  }

  const className = `status-message ${type}${fade ? ' fade' : ''}`;

  return (
    <div className={className}>
      {message}
    </div>
  );
};

StatusMessage.defaultProps = {
  fade: false,
  type: 'default',
};

StatusMessage.propTypes = {
  fade: PropTypes.bool,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'error', 'success', 'warn']),
};

export default StatusMessage;
