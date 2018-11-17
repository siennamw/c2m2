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

export const CREATE_COUNTRY = gql`
  mutation CreateCountry($name: String!, $description: String){
    createCountry(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
