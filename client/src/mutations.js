import gql from 'graphql-tag';

// create entry

export const CREATE_CATALOGER = gql`
  mutation CreateCataloger(
    $name: String!, 
    $email: String!,
    $password: String!,
    $admin: Boolean,
    $description: String
  ){
    createCataloger(
      name: $name, 
      authProvider: { email: { email: $email, password: $password } },
      admin: $admin,
      description: $description
    ) {
      id
      name
      email
      admin
      description
    }
  }
`;

export const CREATE_COLLECTION = gql`
  mutation CreateCollection($name: String!, $description: String, $repository_id: ID!){
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

export const CREATE_FILM = gql`
  mutation CreateFilm(
    $title: String!,
    $secondary_title: String,
    $alias_alternates: String,
    $imdb_link: String,
    $year: Int!,
    $country_id: ID,
    $media_type_id: ID!,
    $composer_ids: [ID],
    $director_ids: [ID],
    $orchestrator_ids: [ID],
    $production_company_ids: [ID],
  ){
    createFilm(
      title: $title,
      secondary_title: $secondary_title,
      alias_alternates: $alias_alternates,
      imdb_link: $imdb_link,
      year: $year,
      country_id: $country_id,
      media_type_id: $media_type_id,
      composer_ids: $composer_ids,
      director_ids: $director_ids,
      orchestrator_ids: $orchestrator_ids,
      production_company_ids: $production_company_ids,
    ) {
      id
      title
      secondary_title
      alias_alternates
      imdb_link
      year
      country {
        id
      }
      media_type {
        id
      }
      composers {
        id
      }
      directors {
        id
      }
      orchestrators {
        id
      }
      production_companies {
        id
      }
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
    $digital_copy_link: String,
    $finding_aid_link: String,
    $citation_source: String,
    $cataloging_notes: String,
    $film_id: ID!,
    $material_format_id: ID!,
    $collection_ids: [ID],
    $publisher_ids: [ID],
  ){
    createWork(
      digital_copy_link: $digital_copy_link,
      finding_aid_link: $finding_aid_link,
      citation_source: $citation_source,
      cataloging_notes: $cataloging_notes,
      film_id: $film_id,
      material_format_id: $material_format_id,
      collection_ids: $collection_ids,
      publisher_ids: $publisher_ids,
    ) {
      id
      digital_copy_link
      finding_aid_link
      citation_source
      cataloging_notes
      film {
        id
      }
      material_format {
        id
      }
      collections {
        id
      }
      publishers {
        id
      }
    }
  }
`;


// update entry

export const UPDATE_CATALOGER = gql`
  mutation UpdateCataloger(
    $id: ID!,
    $name: String!,
    $email: String!,
    $password: String!,
    $admin: Boolean,
    $description: String
  ){
    updateCataloger(
      id: $id,
      name: $name,
      authProvider: { email: { email: $email, password: $password } },
      admin: $admin,
      description: $description
    ) {
      id
      name
      email
      admin
      description
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

export const UPDATE_COLLECTION = gql`
  mutation UpdateCollection(
    $id: ID!,
    $name: String!,
    $description: String,
    $repository_id: ID!
  ){
    updateCollection(
      id: $id,
      name: $name,
      description: $description,
      repository_id: $repository_id
    ) {
      id
      name
      description
      repository {
        id
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

export const UPDATE_COMPOSER = gql`
  mutation UpdateComposer($id: ID!, $name: String!, $imdb_link: String){
    updateComposer(id: $id, name: $name, imdb_link: $imdb_link) {
      id
      name
      imdb_link
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

export const UPDATE_COUNTRY = gql`
  mutation UpdateCountry($id: ID!, $name: String!, $description: String){
    updateCountry(id: $id, name: $name, description: $description) {
      id
      name
      description
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

export const UPDATE_DIRECTOR = gql`
  mutation UpdateDirector($id: ID!, $name: String!, $imdb_link: String){
    updateDirector(id: $id, name: $name, imdb_link: $imdb_link) {
      id
      name
      imdb_link
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

export const UPDATE_FILM = gql`
  mutation UpdateFilm(
    $id: ID!,
    $title: String!,
    $secondary_title: String,
    $alias_alternates: String,
    $imdb_link: String,
    $year: Int!,
    $country_id: ID,
    $media_type_id: ID!,
    $composer_ids: [ID],
    $director_ids: [ID],
    $orchestrator_ids: [ID],
    $production_company_ids: [ID],
  ){
    updateFilm(
      id: $id,
      title: $title,
      secondary_title: $secondary_title,
      alias_alternates: $alias_alternates,
      imdb_link: $imdb_link,
      year: $year,
      country_id: $country_id,
      media_type_id: $media_type_id,
      composer_ids: $composer_ids,
      director_ids: $director_ids,
      orchestrator_ids: $orchestrator_ids,
      production_company_ids: $production_company_ids,
    ) {
      id
      title
      secondary_title
      alias_alternates
      imdb_link
      year
      country {
        id
      }
      media_type {
        id
      }
      composers {
        id
      }
      directors {
        id
      }
      orchestrators {
        id
      }
      production_companies {
        id
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

export const UPDATE_MATERIAL_FORMAT = gql`
  mutation UpdateMaterialFormat($id: ID!, $name: String!, $description: String){
    updateMaterialFormat(id: $id, name: $name, description: $description) {
      id
      name
      description
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

export const UPDATE_MEDIA_TYPE = gql`
  mutation UpdateMediaType($id: ID!, $name: String!, $description: String){
    updateMediaType(id: $id, name: $name, description: $description) {
      id
      name
      description
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

export const UPDATE_PRODUCTION_COMPANY = gql`
  mutation UpdateProductionCompany($id: ID!, $name: String!, $contact_info: String){
    updateProductionCompany(id: $id, name: $name, contact_info: $contact_info) {
      id
      name
      contact_info
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

export const UPDATE_PUBLISHER = gql`
  mutation UpdatePublisher($id: ID!, $name: String!, $contact_info: String){
    updatePublisher(id: $id, name: $name, contact_info: $contact_info) {
      id
      name
      contact_info
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

export const UPDATE_REPOSITORY = gql`
  mutation UpdateRepository($id: ID!, $name: String!, $location: String!, $website: String){
    updateRepository(id: $id, name: $name, location: $location, website: $website) {
      id
      name
      location
      website
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

export const UPDATE_WORK = gql`
  mutation UpdateWork(
    $id: ID!,
    $digital_copy_link: String,
    $finding_aid_link: String,
    $citation_source: String,
    $cataloging_notes: String,
    $publication_status: String,
    $film_id: ID!,
    $material_format_id: ID!,
    $collection_ids: [ID],
    $publisher_ids: [ID],
  ){
    updateWork(
      id: $id,
      digital_copy_link: $digital_copy_link,
      finding_aid_link: $finding_aid_link,
      citation_source: $citation_source,
      cataloging_notes: $cataloging_notes,
      publication_status: $publication_status,
      film_id: $film_id,
      material_format_id: $material_format_id,
      collection_ids: $collection_ids,
      publisher_ids: $publisher_ids,
    ) {
      id
      digital_copy_link
      finding_aid_link
      citation_source
      cataloging_notes
      publication_status
      film {
        id
      }
      material_format {
        id
      }
      collections {
        id
      }
      publishers {
        id
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

export const HANDLE_SUGGESTION_FORM = gql`
  mutation handleSuggestionForm(
    $name: String!,
    $email: String!,
    $composers: String,
    $works: String,
    $link: String,
    $location: String,
    $comments: String,
  ){
    handleSuggestionForm(
      name: $name,
      email: $email,
      composers: $composers,
      works: $works,
      link: $link,
      location: $location,
      comments: $comments
    )
  }
`;

export const HANDLE_CONTACT_FORM = gql`
  mutation handleContactForm($name: String!, $email: String!, $message: String!){
    handleContactForm(name: $name, email: $email, message: $message)
  }
`;

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
