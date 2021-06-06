import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { LIST_ALL_MATERIAL_FORMATS } from '../../../queries';

const MaterialFormatsList = ({ filter }) => (
  <Fragment>
    <h3>Material Formats</h3>
    <QueryWrap
      filter={filter}
      pagination
      query={LIST_ALL_MATERIAL_FORMATS}
      queryName="allMaterialFormats"
    >
      {
        (allMaterialFormats) => (
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
            model="material_format"
            rowData={allMaterialFormats}
          />
        )
      }
    </QueryWrap>
  </Fragment>
);

MaterialFormatsList.defaultProps = {
  filter: {},
};

MaterialFormatsList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default MaterialFormatsList;
