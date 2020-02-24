import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import LinkToEntry from '../LinkToEntry';
import StatusMessage from '../../StatusMessage';

import { LIST_ALL_CATALOGERS } from '../../../queries';

const CatalogersList = () => {
  const {
    data,
    error,
    loading,
  } = useQuery(LIST_ALL_CATALOGERS);

  if (loading) {
    return (
      <StatusMessage message="Fetching..." />
    );
  }

  if (error) {
    return (
      <StatusMessage
        message="Sorry! There was an error fetching results."
        type="error"
      />
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
    <StatusMessage
      message="Sorry! No results were found."
      type="error"
    />
  );
};

export default CatalogersList;
