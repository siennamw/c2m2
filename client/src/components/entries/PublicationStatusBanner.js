import React from 'react';
import PropTypes from 'prop-types';

const PublicationStatusBanner = ({ publicationStatus }) => {
  const descriptionByPubStatus = {
    approved: 'This entry has been reviewed and approved by a project administrator.',
    draft: 'This entry is a draft and can only be viewed by catalogers.',
    provisional: 'This entry has not yet been reviewed by a project administrator.',
  };

  const description = descriptionByPubStatus[publicationStatus];

  if (!publicationStatus || !description) {
    return null;
  }

  return (
    <div className={`publication-status bar ${publicationStatus}`}>
      <span className="h3">
        {`${publicationStatus}:`}
      </span>
      <span>{description}</span>
    </div>
  );
};

PublicationStatusBanner.defaultProps = {
  publicationStatus: null,
};

PublicationStatusBanner.propTypes = {
  publicationStatus: PropTypes.string,
};

export default PublicationStatusBanner;
