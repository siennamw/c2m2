import gql from 'graphql-tag';

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
