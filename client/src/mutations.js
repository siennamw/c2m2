import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation SignInCataloger($email: String!, $password: String!){
    signInCataloger(email: {email: $email, password: $password}) {
      token
      cataloger {
        id
        name
        email
      }
    }
  }
`;
