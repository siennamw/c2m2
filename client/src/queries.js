import gql from 'graphql-tag';

export const LIST_ALL_COLLECTIONS = gql`
  query allCollections {
    allCollections {
      id
      name
    }
  }
`;

export const LIST_ALL_COMPOSERS = gql`
  query allComposers {
    allComposers {
      id
      name
    }
  }
`;

export const LIST_ALL_COUNTRIES = gql`
  query allCountries {
    allCountries {
      id
      name
    }
  }
`;

export const LIST_ALL_DIRECTORS = gql`
  query allDirectors {
    allDirectors {
      id
      name
    }
  }
`;

export const LIST_ALL_MATERIAL_FORMATS = gql`
  query allMaterialFormats {
    allMaterialFormats {
      id
      name
    }
  }
`;

export const LIST_ALL_MEDIA_TYPES = gql`
  query allMediaTypes {
    allMediaTypes {
      id
      name
    }
  }
`;

export const LIST_ALL_PRODUCTION_COMPANIES = gql`
  query allProductionCompanies {
    allProductionCompanies {
      id
      name
    }
  }
`;

export const LIST_ALL_PUBLISHERS = gql`
  query allPublishers {
    allPublishers {
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

export const CATALOGER_BY_ID = gql`
  query cataloger($id: ID!){
    cataloger(id: $id){
      id
      name
      email
      description
      catalogers {
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
      countries {
        id
        name
      }
      created_by {
        id
        name
      }
      directors {
        id
        name
      }
      material_formats {
        id
        name
      }
      media_types {
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
      repositories {
        id
        name
      }
      works {
        id
        name
      }
    }
  }
`;

export const COLLECTION_BY_ID = gql`
  query collection($id: ID!){
    collection(id: $id){
      id
      name
      repository {
        id
      }
      description
      cataloger {
        id
        name
      }
    }
  }
`;

export const COMPOSER_BY_ID = gql`
  query composer($id: ID!){
    composer(id: $id){
      id
      name
      imdb_link
      cataloger {
        id
        name
      }
    }
  }
`;

export const COUNTRY_BY_ID = gql`
  query country($id: ID!){
    country(id: $id){
      id
      name
      description
      cataloger {
        id
        name
      }
    }
  }
`;

export const DIRECTOR_BY_ID = gql`
  query director($id: ID!){
    director(id: $id){
      id
      name
      imdb_link
      cataloger {
        id
        name
      }
    }
  }
`;

export const MATERIAL_FORMAT_BY_ID = gql`
  query material_format($id: ID!){
    material_format(id: $id){
      id
      name
      description
      cataloger {
        id
        name
      }
    }
  }
`;

export const MEDIA_TYPE_BY_ID = gql`
  query media_type($id: ID!){
    media_type(id: $id){
      id
      name
      description
      cataloger {
        id
        name
      }
    }
  }
`;

export const PRODUCTION_COMPANY_BY_ID = gql`
  query production_company($id: ID!){
    production_company(id: $id){
      id
      name
      contact_info
      works {
        id
        title
      }
      cataloger {
        id
        name
      }
    }
  }
`;

export const PUBLISHER_BY_ID = gql`
  query publisher($id: ID!){
    publisher(id: $id){
      id
      name
      contact_info
      works {
        id
        title
      }
      cataloger {
        id
        name
      }
    }
  }
`;

export const REPOSITORY_BY_ID = gql`
  query repository($id: ID!){
    repository(id: $id){
      id
      name
      location
      website
      collections {
        id
        name
      }
      cataloger {
        id
        name
      }
    }
  }
`;

export const WORK_BY_ID = gql`
  query work($id: ID!){
    work(id: $id){
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
      cataloger {
        id
        name
      }
      country {
        id
        name
      }
      material_format {
        id
        name
      }
      media_type {
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
