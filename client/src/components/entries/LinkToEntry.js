import React from 'react';
import PropTypes from 'prop-types';

import { wrapWithLink } from '../../utils';
import { MODEL_NAMES } from '../../constants';

const LinkToEntry = ({
  displayField,
  entry,
  model,
}) => {
  if (!model || !entry || !entry.id) {
    return null;
  }

  const label = displayField && entry[displayField]
    ? entry[displayField]
    : 'View';

  return (
    <div key={entry.id}>
      {wrapWithLink(label, entry.id, model)}
    </div>
  );
};

LinkToEntry.defaultProps = {
  displayField: null,
  entry: null,
  model: null,
};

LinkToEntry.propTypes = {
  displayField: PropTypes.string,
  entry: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  }),
  model: PropTypes.oneOf(MODEL_NAMES),
};

export default LinkToEntry;
