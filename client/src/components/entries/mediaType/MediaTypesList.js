import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { LIST_ALL_MEDIA_TYPES } from '../../../queries';

const MediaTypesList = ({ filter }) => (
  <Fragment>
    <h3>Media Types</h3>
    <QueryWrap
      filter={filter}
      pagination
      query={LIST_ALL_MEDIA_TYPES}
      queryName="allMediaTypes"
    >
      {
        (allMediaTypes) => (
          <EnhancedTable
            columnData={[
              {
                label: 'Name',
                field: 'name',
              },
              {
                label: 'Description',
                field: 'description',
              },
            ]}
            disableSorting
            linkToEntryDisplayField="name"
            model="media_type"
            rowData={allMediaTypes}
          />
        )
      }
    </QueryWrap>
  </Fragment>
);

MediaTypesList.defaultProps = {
  filter: {},
};

MediaTypesList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default MediaTypesList;
