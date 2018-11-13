import gql from "graphql-tag";

export const WORKS_SEARCH = gql`
  {
    allWorks {
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
