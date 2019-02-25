export const LOCAL_STORAGE_KEY = 'c2m2-auth';

// for field names that cannot be changed to plural with the addition of 's'
export const FIELD_TO_PLURAL = {
  country: 'countries',
  production_company: 'production_companies',
  repository: 'repositories',
};

export const TOOLTIP_BY_FIELD = (fieldName) => {
  const tooltip = {
    alias_alternates: 'alias_alternates',
    cataloging_notes: 'cataloging_notes',
    citation_source: 'citation_source',
    collection: 'collection',
    composer: 'composer',
    contact_info: 'contact_info',
    country: 'country',
    description: 'description',
    digital_copy_link: 'digital_copy_link',
    director: 'director',
    finding_aid_link: 'finding_aid_link',
    imdb_link: 'imdb_link',
    location: 'location',
    material_format: 'material_format',
    media_type: 'media_type',
    name: 'name',
    production_company: 'production_company',
    publisher: 'publisher',
    repository: 'repository',
    rights_holder: 'rights_holder',
    secondary_title: 'secondary_title',
    title: 'title',
    year: 'year',
  };

  return tooltip[fieldName]
    ? tooltip[fieldName]
    : tooltip[fieldName.split('_id')[0]];
};
