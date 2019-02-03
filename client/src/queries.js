import gql from 'graphql-tag';

export const LIST_ALL_COLLECTIONS = gql`
    query allCollections {
        allCollections {
            id
            name
        }
    }
`;

export const LIST_ALL_REPOSITORIES = gql`
  query allRepositories {
    allRepositories {
      id
      name
    }
  }
`;

export const WORKS_SEARCH = gql`
  query searchWorks($filter: WorkFilter, $first: Int, $skip: Int){
    allWorks(filter: $filter, first: $first, skip: $skip) {
      id
      year
      title
      secondary_title
      composers {
        id
        name
      }
      directors {
        id
        name
      }
      country {
        id
        name
      }
    }
  }
`;
