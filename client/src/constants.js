import React, { Fragment } from 'react';

export const LOCAL_STORAGE_KEY = 'c2m2-auth';

// for field names that cannot be changed to plural with the addition of 's'
export const FIELD_TO_PLURAL = {
  country: 'countries',
  production_company: 'production_companies',
  repository: 'repositories',
};

export const TOOLTIP_BY_FIELD = (fieldName) => {
  const tooltip = {
    alias_alternates: {
      description: (
        <Fragment>
          Alternate title or translation of title.
          Follow the <a
            href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
            target="_blank"
            rel="noopener noreferrer"
          >capitalization rules in the Chicago Manual of Style</a>.
        </Fragment>
      ),
      rules: [
        'an example rule',
        'another example rule',
      ],
    },
    cataloging_notes: {
      description: 'cataloging_notes',
    },
    citation_source: {
      description: 'citation_source',
    },
    collection: {
      description: 'Select all associated collections. Hold ctrl/cmd to select more than one.',
    },
    composer: {
      description: 'Select all associated composers. Hold ctrl/cmd to select more than one.',
    },
    contact_info: {
      description: 'May be a public website, mailing address, or email address.'
        + ' Do not use individuals\' names or private contact information.',
    },
    country: {
      description: 'country',
    },
    description: {
      description: 'description',
    },
    digital_copy_link: {
      description: 'Full URL. Use a reliable link as close to the resource as possible.',
    },
    director: {
      description: 'Select all associated directors. Hold ctrl/cmd to select'
        + ' more than one.',
    },
    email: {
      description: 'The email address at which project administrators and other contributors may'
        + ' contact you.',
    },
    finding_aid_link: {
      description: 'Full URL. Use a reliable link as close to the resource as possible.',
    },
    imdb_link: {
      description: (
        <Fragment>
          <a
            href="https://www.imdb.com/search/name"
            target="_blank"
            rel="noopener noreferrer"
          >Search IMDB</a> for an entry associated with this person, then copy and paste the full
          URL here.
        </Fragment>
      ),
    },
    location: {
      description: 'City and country.  If in the USA, city and state is adequate. '
        + 'Abbreviations for states are acceptable.',
    },
    material_format: {
      description: 'Select the material format that most closely matches this resource.',
    },
    media_type: {
      description: 'Select the media type that most closely matches this resource.',
    },
    name: {
      description: (
        <Fragment>
          Follow the <a
          href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
          target="_blank"
          rel="noopener noreferrer"
        >capitalization rules in the Chicago Manual of Style</a>.
        </Fragment>
      ),
    },
    production_company: {
      description: 'Select all associated production companies. Hold ctrl/cmd to select'
        + ' more than one.',
    },
    publisher: {
      description: 'Select all associated publishers. Hold ctrl/cmd to select'
        + ' more than one.',
    },
    repository: {
      description: 'Select all associated repositories. Hold ctrl/cmd to select'
        + ' more than one.',
    },
    rights_holder: {
      description: 'rights_holder',
    },
    secondary_title: {
      description: (
        <Fragment>
          Secondary title or subtitle.
          Follow the <a
          href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
          target="_blank"
          rel="noopener noreferrer"
        >capitalization rules in the Chicago Manual of Style</a>.
        </Fragment>
      ),
    },
    title: {
      description: (
        <Fragment>
          Follow the <a
          href="https://www.chicagomanualofstyle.org/book/ed17/part2/ch08/toc.html"
          target="_blank"
          rel="noopener noreferrer"
        >capitalization rules in the Chicago Manual of Style</a>.
        </Fragment>
      ),
    },
    website: {
      description: 'Full URL. Instead of the home page of the site, select the page most relevant'
        + ' to this entry.',
    },
    year: {
      description: 'year',
    },
  };

  return tooltip[fieldName]
    ? tooltip[fieldName]
    : tooltip[fieldName.split('_id')[0]];
};
