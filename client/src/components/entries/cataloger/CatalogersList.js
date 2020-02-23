import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LinkToEntry from '../LinkToEntry';

import { LIST_ALL_CATALOGERS } from '../../../queries';

const CatalogersList = () => {
  const {
    data,
    error,
    loading,
  } = useQuery(LIST_ALL_CATALOGERS);

  if (loading) {
    return (
      <div className="status-message">
        Fetching...
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        Sorry! There was an error fetching results.
      </div>
    );
  }

  const haveData = data && data.allCatalogers && data.allCatalogers.length > 0;

  if (haveData) {
    return (
      <table className="u-full-width">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
          </tr>
          {
            data.allCatalogers.map(cataloger => (
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
    );
  }

  return (
    <div className="status-message error">
      Sorry! No results were found.
    </div>
  );
};

export default CatalogersList;
