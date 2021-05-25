import gql from 'graphql-tag';

export const LIST_ALL_CATALOGERS = gql`
  query allCatalogers {
    allCatalogers {
      id
      admin
      email
      name
    }
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
      imdb_link
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
      imdb_link
    }
  }
`;

export const LIST_ALL_MATERIAL_FORMATS = gql`
  query allMaterialFormats {
    allMaterialFormats {
      id
      description
      name
    }
  }
`;

export const LIST_ALL_MEDIA_TYPES = gql`
  query allMediaTypes {
    allMediaTypes {
      id
      description
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

export const LIST_ALL_REPOSITORIES = gql`
  query allRepositories {
    allRepositories {
      id
      name
    }
  }
`;

export const LIST_ALL_WORKS = gql`
  query allWorks {
    allWorks {
      id
      title
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
      works {
        id
        title
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
      repositories {
        id
        name
      }
      resources {
        id
        material_format {
          name
        }
        work {
          title
        }
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
      works_as_updater {
        id
        title
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
      repositories_as_updater {
        id
        name
      }
      resources_as_updater {
        id
        material_format {
          name
        }
        work {
          title
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

export const CATALOGER_BY_ID_LEAN = gql`
  query cataloger_lean($id: ID!){
    cataloger(id: $id){
      id
      name
      email
      description
      admin
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
      finding_aid_link
      description
      deletable
      repository {
        id
        name
      }
      resources {
        id
        material_format {
          name
        }
        publication_status
        work {
          title
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

export const COMPOSER_BY_ID = gql`
  query composer($id: ID!){
    composer(id: $id){
      id
      name
      imdb_link
      deletable
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
      deletable
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
      deletable
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

export const MATERIAL_FORMAT_BY_ID = gql`
  query material_format($id: ID!){
    material_format(id: $id){
      id
      name
      description
      deletable
      resources {
        id
        publication_status
        work {
          title
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

export const MEDIA_TYPE_BY_ID = gql`
  query media_type($id: ID!){
    media_type(id: $id){
      id
      name
      description
      deletable
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
      deletable
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
      deletable
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

export const RESOURCE_BY_ID = gql`
  query resource($id: ID!){
    resource(id: $id){
      id
      digital_copy_link
      citation_source
      cataloging_notes
      publication_status
      deletable
      work {
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
    work(id: $id){
      id
      title
      secondary_title
      alias_alternates
      imdb_link
      year
      deletable
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
      resources {
        id
        collections {
          repository {
            location,
            name,
          }
        }
        material_format {
          name
        }
        publication_status
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

export const SEARCH_CATALOGERS = gql`
  query searchCatalogers(
    $filter: CatalogerFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allCatalogers(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      admin
      email
      name
    }
  }
`;

export const SEARCH_COLLECTIONS = gql`
  query searchCollections(
    $filter: CollectionFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allCollections(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
      description
    }
  }
`;

export const SEARCH_COMPOSERS = gql`
  query searchComposers(
    $filter: ComposerFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allComposers(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
      imdb_link
    }
  }
`;

export const SEARCH_COUNTRIES = gql`
  query searchCountries(
    $filter: CountryFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allCountries(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
      description
    }
  }
`;

export const SEARCH_DIRECTORS = gql`
  query searchDirectors(
    $filter: DirectorFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allDirectors(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
      imdb_link
    }
  }
`;

export const SEARCH_MATERIAL_FORMATS = gql`
  query searchMaterialFormats(
    $filter: MaterialFormatFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allMaterialFormats(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
      description
    }
  }
`;

export const SEARCH_MEDIA_TYPES = gql`
  query searchMediaTypes(
    $filter: MediaTypeFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allMediaTypes(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
      description
    }
  }
`;

export const SEARCH_PRODUCTION_COMPANIES = gql`
  query searchProductionCompanies(
    $filter: ProductionCompanyFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allProductionCompanies(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
    }
  }
`;

export const SEARCH_REPOSITORIES = gql`
  query searchRepositories(
    $filter: RepositoryFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allRepositories(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      name
      location
    }
  }
`;

export const SEARCH_RESOURCES = gql`
  query searchResources(
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allResources(
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
      id
      collection {
        id
        name
      }
      material_format {
        id
        name
      }
      publication_status
      work {
        id
        title
        year
      }
    }
  }
`;

export const SEARCH_WORKS = gql`
  query searchWorks(
    $filter: WorkFilter,
    $first: Int,
    $skip: Int,
    $sorting: SortingFilter,
  ){
    allWorks(
      filter: $filter,
      first: $first,
      skip: $skip,
      sorting: $sorting,
    ) {
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
      production_companies {
        id
        name
      }
    }
  }
`;
