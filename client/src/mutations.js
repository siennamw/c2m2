import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation SignInCataloger($email: String!, $password: String!){
    signInCataloger(email: { email: $email, password: $password }) {
      token
      cataloger {
        id
        name
        email
      }
    }
  }
`;

export const CREATE_CATALOGER = gql`
  mutation CreateCataloger(
    $name: String!, 
    $email: String!,
    $password: String!,
    $description: String
  ){
    createCataloger(
      name: $name, 
      authProvider: { email: { email: $email, password: $password } },
      description: $description
    ) {
      id
      name
      email
    }
  }
`;

export const CREATE_COLLECTION = gql`
  mutation CreateCollection($name: String!, $description: String, $repository_id: Int!){
    createCollection(name: $name, description: $description, repository_id: $repository_id) {
      id
      name
      description
      repository {
        id
      }
    }
  }
`;

export const CREATE_COMPOSER = gql`
  mutation CreateComposer($name: String!, $imdb_link: String){
    createComposer(name: $name, imdb_link: $imdb_link) {
      id
      name
      imdb_link
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

export const CREATE_DIRECTOR = gql`
  mutation CreateDirector($name: String!, $imdb_link: String){
    createDirector(name: $name, imdb_link: $imdb_link) {
      id
      name
      imdb_link
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

export const CREATE_PRODUCTION_COMPANY = gql`
  mutation CreateProductionCompany($name: String!, $contact_info: String){
    createProductionCompany(name: $name, contact_info: $contact_info) {
      id
      name
      contact_info
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

export const CREATE_WORK = gql`
  mutation CreateWork(
    $title: String!,
    $secondary_title: String,
    $alias_alternates: String,
    $year: Int!,
    $digital_copy_link: String,
    $finding_aid_link: String,
    $rights_holder: String,
    $citation_source: String,
    $cataloging_notes: String,
    $country_id: Int,
    $media_type_id: Int!,
    $material_format_id: Int!,
    $collection_ids: [ID],
    $composer_ids: [ID],
    $director_ids: [ID],
    $production_company_ids: [ID],
    $publisher_ids: [ID],
  ){
    createWork(
      title: $title,
      secondary_title: $secondary_title,
      alias_alternates: $alias_alternates,
      year: $year,
      digital_copy_link: $digital_copy_link,
      finding_aid_link: $finding_aid_link,
      rights_holder: $rights_holder,
      citation_source: $citation_source,
      cataloging_notes: $cataloging_notes,
      country_id: $country_id,
      media_type_id: $media_type_id,
      material_format_id: $material_format_id,
      collection_ids: $collection_ids,
      composer_ids: $composer_ids,
      director_ids: $director_ids,
      production_company_ids: $production_company_ids,
      publisher_ids: $publisher_ids,
    ) {
      id
      title
      secondary_title
      alias_alternates
      year
      digital_copy_link
      finding_aid_link
      rights_holder
      citation_source
      cataloging_notes
      country {
        id
        name
      }
      media_type {
        id
        name
      }
      material_format {
        id
        name
      }
      collections {
        id
        name
      }
      composers {
        id
        name
      }
      directors {
        id
        name
      }
      production_companies {
        id
        name
      }
      publishers {
        id
        name
      }
    }
  }
`;
