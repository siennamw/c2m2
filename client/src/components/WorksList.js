import React from 'react';

import { Query } from 'react-apollo';
import { isEqual } from 'lodash';

import * as queries from '../queries';
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
    if (!isEqual(this.props.filter, prevProps.filter)) {
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
        skip: data.allWorks.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        let result;
        const noMore = !fetchMoreResult ||
          !fetchMoreResult.allWorks ||
          fetchMoreResult.allWorks.length === 0;

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
              allWorks: [...prev.allWorks, ...fetchMoreResult.allWorks]
            }
          };
          this.setState({
            moreResults: true,
            loadingResults: false,
          });
        }
        return result;
      }
    });
  };

  render() {
    const content = (loading, error, data, fetchMore) => {
      if (loading) return <div>Fetching...</div>;
      if (error) return <div>Sorry! There was an error fetching results.</div>;

      const haveData = data && data.allWorks && data.allWorks.length > 0;

      if (haveData) {
        return <WorksListTable works={data.allWorks}
                               loadMore={() => this.loadMore(data, fetchMore)}
                               moreResults={this.state.moreResults}
                               loadingResults={this.state.loadingResults}
        />
      }

      return <div>Sorry! No results were found.</div>;
    };

    return (
      <Query query={queries.WORKS_SEARCH}
             variables={{
               filter: this.props.filter || {},
               first: 5,
               skip: 0
             }}
      >
        {({ loading, error, data, fetchMore }) => {
          return content(loading, error, data, fetchMore);
        }}
      </Query>
    );
  }
}

const WorksListTable = ({ works, loadMore, moreResults, loadingResults }) => {
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
    )
  );

  let buttonText = 'Load More Results';

  if(loadingResults){
    buttonText = 'Loading...';
  } else if(!moreResults){
    buttonText = 'No More Results';
  }

  return (
    <div>
      <table id='works-list-table' className="u-full-width">
        {items}
      </table>
      <button className='center load-more' onClick={loadMore} disabled={!moreResults || loadingResults}>
        {buttonText}
      </button>
    </div>
  )
};

export default WorksList;
