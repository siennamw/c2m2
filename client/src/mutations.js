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

export const CREATE_MATERIAL_FORMAT = gql`
  mutation CreateMaterialFormat($name: String!, $description: String){
    createMaterialFormat(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const CREATE_MEDIA_TYPE = gql`
  mutation CreateMediaType($name: String!, $description: String){
    createMediaType(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const CREATE_PUBLISHER = gql`
  mutation CreatePublisher($name: String!, $contact_info: String){
    createPublisher(name: $name, contact_info: $contact_info) {
      id
      name
      contact_info
    }
  }
`;

export const CREATE_REPOSITORY = gql`
  mutation CreateRepository($name: String!, $location: String!, $website: String){
    createRepository(name: $name, location: $location, website: $website) {
      id
      name
      location
      website
    }
  }
`;
