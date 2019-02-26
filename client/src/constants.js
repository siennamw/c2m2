import React from 'react';

export const LOCAL_STORAGE_KEY = 'c2m2-auth';

// for field names that cannot be changed to plural with the addition of 's'
export const FIELD_TO_PLURAL = {
  country: 'countries',
  production_company: 'production_companies',
  repository: 'repositories',
};

export const TOOLTIP_BY_FIELD = (fieldName) => {
  const tooltip = {
    alias_alternates: (
      <div>
        Alternate title or translation of title.
        Follow the <a
          href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
          target="_blank"
          rel="noopener noreferrer"
        >capitalization rules in the Chicago Manual of Style</a>.
      </div>
    ),
    // cataloging_notes: 'cataloging_notes',
    // citation_source: 'citation_source',
    collection: 'Select all associated collections. Hold ctrl/cmd to select'
      + ' more than one.',
    composer: 'Select all associated composers. Hold ctrl/cmd to select'
      + ' more than one.',
    contact_info: 'May be a public website, mailing address, or email address.'
      + ' Do not use individuals\' names or private contact information.',
    // country: 'country',
    // description: 'description',
    digital_copy_link: 'Full URL. Use a reliable link as close to the resource as possible.',
    director: 'Select all associated directors. Hold ctrl/cmd to select'
      + ' more than one.',
    email: 'The email address at which project administrators and other contributors may'
      + ' contact you.',
    finding_aid_link: 'Full URL. Use a reliable link as close to the resource as possible.',
    imdb_link: (
      <div>
        <a
          href="https://www.imdb.com/search/name"
          target="_blank"
          rel="noopener noreferrer"
        >Search IMDB</a> for an entry associated with this person, then copy and paste the full
        URL here.
      </div>
    ),
    location: 'City and country.  If in the USA, city and state is adequate. '
      + 'Abbreviations for states are acceptable.',
    material_format: 'Select the material format that most closely matches this resource.',
    media_type: 'Select the media type that most closely matches this resource.',
    name: (
      <div>
        Follow the <a
          href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
          target="_blank"
          rel="noopener noreferrer"
        >capitalization rules in the Chicago Manual of Style</a>.
      </div>
    ),
    production_company: 'Select all associated production companies. Hold ctrl/cmd to select'
      + ' more than one.',
    publisher: 'Select all associated publishers. Hold ctrl/cmd to select'
      + ' more than one.',
    repository: 'Select all associated repositories. Hold ctrl/cmd to select'
      + ' more than one.',
    // rights_holder: 'rights_holder',
    secondary_title: (
      <div>
        Secondary title or subtitle.
        Follow the <a
          href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
          target="_blank"
          rel="noopener noreferrer"
        >capitalization rules in the Chicago Manual of Style</a>.
      </div>
    ),
    title: (
      <div>
        Follow the <a
          href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
          target="_blank"
          rel="noopener noreferrer"
        >capitalization rules in the Chicago Manual of Style</a>.
      </div>
    ),
    website: 'Full URL. Instead of the home page of the site, select the page most relevant'
      + ' to this entry.',
    // year: 'year',
  };

  return tooltip[fieldName]
    ? tooltip[fieldName]
    : tooltip[fieldName.split('_id')[0]];
};
