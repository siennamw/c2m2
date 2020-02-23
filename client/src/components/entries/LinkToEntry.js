import React from 'react';
import PropTypes from 'prop-types';

import { wrapWithLink } from '../../utils';
import { MODEL_NAMES } from '../../constants';

const LinkToEntry = ({
  displayField,
  entry,
  model,
}) => {
  if (!model || !entry || !entry.id || !entry[displayField]) {
    return null;
  }

  return (
    <div key={entry.id}>
      {wrapWithLink(entry[displayField], entry.id, model)}
    </div>
  );
};

LinkToEntry.defaultProps = {
  displayField: 'name',
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
