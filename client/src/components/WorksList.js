import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { WORKS_SEARCH } from '../queries';
import { wrapWithLink } from '../utils';

const WorksList = ({ filter }) => {
  const [moreResults, setMoreResults] = useState(true);
  const [loadingResults, setLoadingResults] = useState(false);

  useEffect(() => {
    // make sure button is enabled for a new search
    setMoreResults(true);
    setLoadingResults(false);
  }, [filter]);

  const variables = {
    filter,
    first: 5,
    skip: 0,
  };

  const {
    data,
    error,
    fetchMore,
    loading,
  } = useQuery(WORKS_SEARCH, { variables });

  const loadMore = () => {
    setLoadingResults(true);

    fetchMore({
      variables: {
        skip: data.allWorks.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        let result;
        const noMore = !fetchMoreResult
          || !fetchMoreResult.allWorks
          || fetchMoreResult.allWorks.length === 0;

        if (noMore) {
          result = prev;
          setLoadingResults(false);
          setMoreResults(false);
        } else {
          result = {
            ...prev,
            ...{
              allWorks: [...prev.allWorks, ...fetchMoreResult.allWorks],
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

  const haveData = data && data.allWorks && data.allWorks.length > 0;

  if (haveData) {
    return (
      <WorksListTable
        loadingResults={loadingResults}
        loadMore={() => loadMore()}
        moreResults={moreResults}
        works={data.allWorks}
      />
    );
  }

  return (
    <div className="status-message error">
      Sorry! No results were found.
    </div>
  );
};

WorksList.defaultProps = {
  filter: {},
};

WorksList.propTypes = {
  filter: PropTypes.object,
};

const WorksListTable = ({
  loadingResults,
  loadMore,
  moreResults,
  works,
}) => {
  const wrap = (item, itemType) => (
    <div key={item.id}>
      { wrapWithLink(item.name, item.id, itemType) }
    </div>
  );

  const items = works.map(work => (
    <tbody key={work.id}>
      <tr>
        <td colSpan="4">
          <h4>
            <a href={`/work/${work.id}`}>
              {work.title}
              {work.secondary_title ? `: ${work.secondary_title}` : ''}
            </a>
          </h4>
        </td>
      </tr>
      <tr>
        <th>Year</th>
        <th>Composer</th>
        <th>Director</th>
        <th>Country</th>
      </tr>
      <tr>
        <td>{work.year}</td>
        <td>{work.composers.map(composer => wrap(composer, 'composer'))}</td>
        <td>{work.directors.map(director => wrap(director, 'director'))}</td>
        <td>{work.country ? wrap(work.country, 'country') : null}</td>
      </tr>
    </tbody>
  ));

  let buttonText = 'Load More Results';

  if (loadingResults) {
    buttonText = 'Loading...';
  } else if (!moreResults) {
    buttonText = 'No More Results';
  }

  return (
    <Fragment>
      <table
        id="works-list-table"
        className="u-full-width"
      >
        {items}
      </table>
      <button
        className="center load-more"
        disabled={!moreResults || loadingResults}
        onClick={loadMore}
        type="button"
      >
        {buttonText}
      </button>
    </Fragment>
  );
};

WorksListTable.defaultProps = {
  loadingResults: false,
  moreResults: true,
  works: [],
};

WorksListTable.propTypes = {
  loadMore: PropTypes.func.isRequired,
  loadingResults: PropTypes.bool,
  moreResults: PropTypes.bool,
  works: PropTypes.arrayOf(PropTypes.object),
};

export default WorksList;
