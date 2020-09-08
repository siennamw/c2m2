import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { LIST_ALL_MATERIAL_FORMATS } from '../../../queries';

const MaterialFormatsList = ({ filter }) => (
  <Fragment>
    <h3>Material Formats</h3>
    <QueryWrap
      filter={filter}
      query={LIST_ALL_MATERIAL_FORMATS}
      queryName="allMaterialFormats"
    >
      {
        (allMaterialFormats) => (
          <table className="u-full-width">
            <tbody>
              {
                allMaterialFormats.map((materialFormat) => (
                  <tr key={materialFormat.id}>
                    <th>
                      <LinkToEntry
                        entry={materialFormat}
                        model="material_format"
                      />
                    </th>
                    <td>
                      {materialFormat.description}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
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
