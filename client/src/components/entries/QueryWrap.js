import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import DeletionStatusBanner from './DeletionStatusBanner';
import StatusMessage from '../StatusMessage';
import * as queries from '../../queries';

const QueryWrap = ({
  children,
  filter,
  id,
  sortAscending,
  limit,
  sortBy,
  pagination,
  query,
  queryName,
}) => {
  const variables = {
    id,
    filter,
    first: limit,
    sorting: {
      'is_ascending': sortAscending,
      field: sortBy,
    },
    skip: 0,
  };

  const [moreResults, setMoreResults] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);

  const {
    data,
    error,
    fetchMore,
    loading,
    refetch,
  } = useQuery(query, { variables, onCompleted: () => setLoadingResults(false) });

  let buttonText = 'Load More Results';

  if (loadingResults) {
    buttonText = 'Loading...';
  } else if (!moreResults) {
    buttonText = 'No More Results';
  }

  useEffect(() => {
    // make sure button is enabled for a new search
    setMoreResults(true);
    setLoadingResults(false);
  }, [filter, sortAscending, sortBy]);

  useEffect(() => {
    // if no more results after initial query, set moreResults accordingly
    if (data && data[queryName] && data[queryName].length < limit) {
      setMoreResults(false);
    }
  }, [data, limit, queryName]);

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [refetch, sortAscending, sortBy]);

  const loadMore = () => {
    setLoadingResults(true);

    fetchMore({
      variables: {
        skip: data[queryName].length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        let result;
        const noMore = !fetchMoreResult
          || !fetchMoreResult[queryName]
          || (Array.isArray(fetchMoreResult[queryName]) && fetchMoreResult[queryName].length === 0);

        if (noMore) {
          result = prev;
          setLoadingResults(false);
          setMoreResults(false);
        } else {
          result = {
            ...prev,
            ...{
              [queryName]: [...prev[queryName], ...fetchMoreResult[queryName]],
            },
          };
          setLoadingResults(false);
          // if number of results is same as limit, there are probably more results
          setMoreResults(limit > 0 && fetchMoreResult[queryName].length === limit);
        }
        return result;
      },
    });
  };

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

  const haveData = data && data[queryName];

  if (!haveData || (Array.isArray(data[queryName]) && data[queryName].length === 0)) {
    return (
      <StatusMessage
        message="Sorry! No results were found."
        type="error"
      />
    );
  }

  return (
    <Fragment>
      <DeletionStatusBanner
        deleted={data[queryName] && data[queryName].deleted}
      />
      {children(data[queryName])}
      {
        pagination
          ? (
            <button
              className="center load-more"
              disabled={!moreResults || loadingResults}
              onClick={loadMore}
              type="button"
            >
              {buttonText}
            </button>
          )
          : null
      }
    </Fragment>
  );
};

QueryWrap.defaultProps = {
  filter: {},
  id: undefined,
  limit: 25,
  pagination: true,
  sortAscending: true,
  sortBy: 'id',
};

QueryWrap.propTypes = {
  children: PropTypes.func.isRequired,
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  limit: PropTypes.number,
  pagination: PropTypes.bool,
  query: PropTypes.oneOf(Object.values(queries)).isRequired,
  queryName: PropTypes.string.isRequired,
  sortAscending: PropTypes.bool,
  sortBy: PropTypes.string,
};

export default QueryWrap;
