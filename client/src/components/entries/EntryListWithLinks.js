import React from 'react';
import PropTypes from 'prop-types';

import { sortByField } from '../../utils';
import { MODEL_NAMES } from '../../constants';
import LinkToEntry from './LinkToEntry';

const EntryListWithLinks = ({
  disableSort,
  displayFieldName,
  items,
  model,
}) => {
  if (!model || items.length === 0 || !items[0].id || !items[0][displayFieldName]) {
    return null;
  }

  const itemList = disableSort
    ? items
    : sortByField(items, displayFieldName);

  return (
    itemList.map(item => (
      <LinkToEntry
        displayField={displayFieldName}
        entry={item}
        key={item.id}
        model={model}
      />
    ))
  );
};

EntryListWithLinks.defaultProps = {
  disableSort: false,
  displayFieldName: 'name',
  items: [],
};

EntryListWithLinks.propTypes = {
  disableSort: PropTypes.bool,
  displayFieldName: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
  })),
  model: PropTypes.oneOf(MODEL_NAMES).isRequired,
};

export default EntryListWithLinks;
