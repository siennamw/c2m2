import React from 'react';

import { Query } from 'react-apollo';

import * as queries from '../queries';

const WorksList = ({filter, itemsPerPage}) => {
  const loadMore = (data, fetchMore) => {
    fetchMore({
      variables: {
        skip: data.allWorks.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {...prev, ...{
            allWorks: [...prev.allWorks, ...fetchMoreResult.allWorks]
          }};
      }
    })
  };

  return (
    <Query query={queries.WORKS_SEARCH}
           variables={{
             filter: filter || {},
             first: itemsPerPage || 5,
             skip: 0
           }}
    >
      {({ loading, error, data, fetchMore }) => {
        return (
          <div>
            <h2>Browse Works</h2>
            { loading ? <div>Fetching...</div> : undefined }
            { error ? <div>Error: Works could not be fetched.</div> : undefined }
            { !loading && !error ?
              <WorksListTable works={data.allWorks}
                              onLoadMore={() => loadMore(data, fetchMore)}
              /> :
              undefined
            }
          </div>
        );
      }}
    </Query>
  );
};

const WorksListTable = ({works, onLoadMore}) => {
  const wrapWithLink = (item) => (
    // TODO: make this link functional
    <span key={item.id}><a href={item.id}>{item.name}</a></span>
  );

  const items = works.map(work => (
      <tbody key={work.id}>
        <tr>
          <td colSpan="4">
            <h4>{work.title}{work.secondary_title ? `: ${work.secondary_title}` : ''}</h4>
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
          <td>{work.composers.map(composer => wrapWithLink(composer))}</td>
          <td>{work.directors.map(director => wrapWithLink(director))}</td>
          <td>{wrapWithLink(work.country)}</td>
        </tr>
      </tbody>
    )
  );

  return (
    <div>
      <table id='works-list-table' className="u-full-width">
        {items}
      </table>
      <button className='center load-more' onClick={onLoadMore}>Load More Results</button>
    </div>
  )
};

export default WorksList;
