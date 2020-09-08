import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import StatusMessage from '../StatusMessage';
import * as queries from '../../queries';

const QueryWrap = ({
  children,
  filter,
  id,
  limit,
  pagination,
  query,
  queryName,
}) => {
  const [moreResults, setMoreResults] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);

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
  }, [filter]);

  const vars = {
    id,
    filter,
    first: limit,
    skip: 0,
  };

  const {
    data,
    error,
    fetchMore,
    loading,
  } = useQuery(query, { variables: vars });

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
          setMoreResults(true);
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
  pagination: false,
};

QueryWrap.propTypes = {
  children: PropTypes.func.isRequired,
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  limit: PropTypes.number,
  query: PropTypes.oneOf(Object.values(queries)).isRequired,
  queryName: PropTypes.string.isRequired,
  pagination: PropTypes.bool,
};

export default QueryWrap;
