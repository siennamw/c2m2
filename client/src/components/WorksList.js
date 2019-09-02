import React from 'react';
import PropTypes from 'prop-types';

import { Query } from '@apollo/react-components';
import { isEqual } from 'lodash';

import { WORKS_SEARCH } from '../queries';
import { wrapWithLink } from '../utils';

class WorksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moreResults: true,
      loadingResults: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { filter } = this.props;
    if (!isEqual(filter, prevProps.filter)) {
      // make sure button is enabled for a new search
      this.setState({
        moreResults: true,
        loadingResults: false,
      });
    }
  }

  loadMore = (data, fetchMore) => {
    this.setState({ loadingResults: true });

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
          this.setState({
            moreResults: false,
            loadingResults: false,
          });
        } else {
          result = {
            ...prev,
            ...{
              allWorks: [...prev.allWorks, ...fetchMoreResult.allWorks],
            },
          };
          this.setState({
            moreResults: true,
            loadingResults: false,
          });
        }
        return result;
      },
    });
  };

  render() {
    const content = (loading, error, data, fetchMore) => {
      if (loading) {
        return <div className="status-message">Fetching...</div>;
      }
      if (error) {
        return (
          <div className="status-message error">Sorry! There was an error fetching results.</div>
        );
      }

      const haveData = data && data.allWorks && data.allWorks.length > 0;

      if (haveData) {
        const { moreResults, loadingResults } = this.state;
        return (
          <WorksListTable
            works={data.allWorks}
            loadMore={() => this.loadMore(data, fetchMore)}
            moreResults={moreResults}
            loadingResults={loadingResults}
          />
        );
      }

      return <div className="status-message error">Sorry! No results were found.</div>;
    };

    const { filter } = this.props;
    const first = 5;
    const skip = 0;

    return (
      <Query
        query={WORKS_SEARCH}
        variables={{
          filter,
          first,
          skip,
        }}
      >
        {
          ({ loading, error, data, fetchMore }) => (
            content(loading, error, data, fetchMore)
          )
        }
      </Query>
    );
  }
}

WorksList.defaultProps = {
  filter: {},
};

WorksList.propTypes = {
  filter: PropTypes.object,
};

const WorksListTable = ({
  loadMore,
  loadingResults,
  moreResults,
  works,
}) => {
  const wrap = (item, itemType) => (
    <div key={item.id}>{wrapWithLink(item.name, item.id, itemType)}</div>
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
    <div>
      <table id="works-list-table" className="u-full-width">
        {items}
      </table>
      <button
        type="button"
        className="center load-more"
        onClick={loadMore}
        disabled={!moreResults || loadingResults}
      >
        {buttonText}
      </button>
    </div>
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
