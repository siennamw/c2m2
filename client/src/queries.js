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
