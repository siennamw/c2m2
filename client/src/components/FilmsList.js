import React from 'react';
import PropTypes from 'prop-types';

import { Query } from 'react-apollo';
import { isEqual } from 'lodash';

import * as queries from '../queries';
import { wrapWithLink } from '../utils';

class FilmsList extends React.Component {
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
        skip: data.allFilms.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        let result;
        const noMore = !fetchMoreResult
          || !fetchMoreResult.allFilms
          || fetchMoreResult.allFilms.length === 0;

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
              allFilms: [...prev.allFilms, ...fetchMoreResult.allFilms],
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

      const haveData = data && data.allFilms && data.allFilms.length > 0;

      if (haveData) {
        const { moreResults, loadingResults } = this.state;
        return (
          <FilmsListTable
            films={data.allFilms}
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
        query={queries.FILMS_SEARCH}
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

FilmsList.defaultProps = {
  filter: {},
};

FilmsList.propTypes = {
  filter: PropTypes.object,
};

const FilmsListTable = ({
  loadMore,
  loadingResults,
  moreResults,
  films,
}) => {
  const wrap = (item, itemType) => (
    <div key={item.id}>{wrapWithLink(item.name, item.id, itemType)}</div>
  );

  const items = films.map(film => (
    <tbody key={film.id}>
      <tr>
        <td colSpan="4">
          <h4>
            <a href={`/film/${film.id}`}>
              {film.title}
              {film.secondary_title ? `: ${film.secondary_title}` : ''}
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
        <td>{film.year}</td>
        <td>{film.composers.map(composer => wrap(composer, 'composer'))}</td>
        <td>{film.directors.map(director => wrap(director, 'director'))}</td>
        <td>{film.country ? wrap(film.country, 'country') : null}</td>
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
      <table id="films-list-table" className="u-full-width">
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

FilmsListTable.defaultProps = {
  loadingResults: false,
  moreResults: true,
  films: [],
};

FilmsListTable.propTypes = {
  loadMore: PropTypes.func.isRequired,
  loadingResults: PropTypes.bool,
  moreResults: PropTypes.bool,
  films: PropTypes.arrayOf(PropTypes.object),
};

export default FilmsList;
