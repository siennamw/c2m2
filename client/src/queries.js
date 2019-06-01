import gql from 'graphql-tag';

export const SELF_IS_ADMIN = gql`
  query selfIsAdmin {
    selfIsAdmin
  }
`;

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

export const LIST_ALL_FILMS = gql`
  query allFilms {
    allFilms {
      id
      title
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
        title
      }
      catalogers_as_updater {
        id
        name
      }
      collections_as_updater {
        id
        name
      }
      composers_as_updater {
        id
        name
      }
      countries_as_updater {
        id
        name
      }
      directors_as_updater {
        id
        name
      }
      material_formats_as_updater {
        id
        name
      }
      media_types_as_updater {
        id
        name
      }
      production_companies_as_updater {
        id
        name
      }
      publishers_as_updater {
        id
        name
      }
      repositories_as_updater {
        id
        name
      }
      works_as_updater {
        id
        title
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
        id
        name
      }
    }
  }
`;

export const CATALOGER_BY_ID_LEAN = gql`
  query cataloger_lean($id: ID!){
    selfIsAdmin
    cataloger(id: $id){
      id
      name
      email
      description
      admin
      is_self
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      description
      repository {
        id
        name
      }
      works {
        id
        title
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      works {
        id
        title
      }
      works_as_orchestrator {
        id
        title
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      works {
        id
        title
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      works {
        id
        title
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
        id
        name
      }
    }
  }
`;

export const FILM_BY_ID = gql`
  query film($id: ID!){
    selfIsAdmin
    film(id: $id){
      id
      title
      secondary_title
      alias_alternates
      imdb_link
      year
      country {
        id
        name
      }
      media_type {
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
      orchestrators {
        id
        name
      }
      production_companies {
        id
        name
      }
      works {
        id
        material_format {
          name
        }
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
        id
        name
      }
    }
  }
`;

export const FILMS_SEARCH = gql`
  query searchFilms($filter: FilmFilter, $first: Int, $skip: Int){
    allFilms(filter: $filter, first: $first, skip: $skip) {
      id
      title
      secondary_title
      year
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

export const MATERIAL_FORMAT_BY_ID = gql`
  query material_format($id: ID!){
    material_format(id: $id){
      id
      name
      description
      works {
        id
        title
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      works {
        id
        title
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
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
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
        id
        name
      }
    }
  }
`;

export const WORK_BY_ID = gql`
  query work($id: ID!){
    selfIsAdmin
    work(id: $id){
      id
      digital_copy_link
      finding_aid_link
      citation_source
      cataloging_notes
      publication_status
      film {
        id
        title
      }
      material_format {
        id
        name
      }
      collections {
        id
        name
      }
      publishers {
        id
        name
      }
      created_at
      created_by {
        id
        name
      }
      updated_at
      updated_by {
        id
        name
      }
    }
  }
`;
