import React from 'react';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { LIST_ALL_CATALOGERS } from '../../../queries';

const CatalogersList = () => (
  <QueryWrap query={LIST_ALL_CATALOGERS} queryName="allCatalogers">
    {
      allCatalogers => (
        <table className="u-full-width">
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
            </tr>
            {
              allCatalogers.map(cataloger => (
                <tr>
                  <td>
                    <LinkToEntry entry={cataloger} model="cataloger" />
                  </td>
                  <td>
                    <a href={`mailto:${cataloger.email}`}>
                      {cataloger.email}
                    </a>
                  </td>
                  <td>
                    {cataloger.admin ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )
    }
  </QueryWrap>
);

export default CatalogersList;
