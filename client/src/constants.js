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
      description: 'Aliases used by creators and alternate forms of title.',
      rules: [
        'Free field for any alternate forms of the title of the work or alias used by composer of musical work.',
        'Can also be used to provide English translation of foreign tiles.',
      ],
    },
    cataloging_notes: {
      description: 'Any other information pertinent to entry.',
      rules: [
        'Free field in which cataloger can place any other notes, unanswered questions, or relevant information regarding the entry.',
      ],
    },
    citation_source: {
      description: 'How information was found.',
      rules: [
        'Reference source (include citation for book following CMS16), or',
        'Article/book citation (include citation for article following CMS16), or',
        'Submission via C2M2 website (include name of submitter if they desire credit), or',
        'Coordinating project (include name and website of project), or',
        'C2M2 project research (include name of project member)',
      ],
    },
    collection: {
      description: 'Official name(s) of collection(s) in which the record is held.',
      rules: [
        'Enter year alone, entered in Arabic numerals.',
        'The year should be year of release of accompanied work score is associated with, or publication in the case of collection or published score.',
      ],
    },
    composer: {
      description: 'Name(s) of composer(s) of musical work.',
      rules: [
        'Use LC authority version of name if available.',
        'Include birth and death dates.',
        'Do not use aliases in this field.',
      ],
    },
    contact_info: {
      description: 'Public website, mailing address, or email address.',
      rules: [
        'Do not use individuals\' names or private contact information.',
      ],
    },
    country: {
      description: 'Official name of country of production.',
      rules: [
        'Primary country where production company, or primary commercial market for film, is located.',
        'Use Getty Thesaurus of Geographic Names for authority version of country.',
      ],
    },
    description: {
      description: 'Free field for further description.',
    },
    digital_copy_link: {
      description: 'Full, stable URL or permalink to a digital copy of the resource or as close to the resource as possible.',
    },
    director: {
      description: 'Director(s) of accompanied work.',
      rules: [
        'Use LC authority version of name if available.',
        'Include birth and death dates.',
        'Do not use aliases in this field.',
      ],
    },
    email: {
      description: 'The email address at which project administrators and other contributors may'
        + ' contact you.',
    },
    finding_aid_link: {
      description: 'Full, stable URL or permalink to a finding aid.',
    },
    imdb_link: {
      description: (
        <Fragment>
          <a
            href="https://www.imdb.com/search/name"
            target="_blank"
            rel="noopener noreferrer"
          >Search IMDB</a> for the entry associated with this person, then copy and paste the full
          URL here.
        </Fragment>
      ),
    },
    location: {
      description: 'City and country.  If in the USA, city and state is adequate.'
        + 'Abbreviations for states are acceptable.',
    },
    material_format: {
      description: 'Physical format of material in collection.',
    },
    media_type: {
      description: 'Primary media type of the accompanied work that musical work is associated with.',
      rules: [
        'Films and Series released/produced via streaming services (i.e. Netflix, Hulu, Amazon) or in a web-first format (i.e. YouTube, Vimeo, or self-published on a personal site) are to be categorized under whatever film or series format that best fits the work.',
        '"Serial Series" is any series that comes out at periodic intervals, and has multiple episodes that constitute a whole. This can include on-going or mini-series.',
      ],
    },
    name: {
      description: 'Full name.',
      rules: [
        'Use LC authority version of name if available.',
        'For people, include birth and death dates.',
        'Do not use aliases in this field.',
      ],
    },
    production_company: {
      description: 'Corporate body that produced or financed the accompanied work.',
      rules: [
        'Use LC authority version of name if available.',
        'If corporation has changed names or merged since time of production, list name of company as it appeared during production and list current name in additional entry.',
        'If multiple companies responsible for production, list all known entities and observe above rule regarding any alternate or new names.',
      ],
    },
    publisher: {
      description: 'Corporate body that published the musical work.',
      rules: [
        'Use LC authority version of name if available.',
        'If corporation has changed names or merged since time of production, list name of company as it appeared during production and list current name in additional entry.',
        'If multiple companies responsible for production, list all known entities and observe above rule regarding any alternate or new names.',
        'If publisher is unknown, then enter [unknown], include brackets.',
      ],
    },
    repository: {
      description: 'Name of repository that contains the resource.',
      rules: [
        'Headline-style capitalization (CMS16 8.157).',
        'Use LC authority version of institution name if available.',
        'Do not use nicknames of institutions in this field.',
      ],
    },
    secondary_title: {
      description: 'Secondary title or subtitle.',
      rules: [
        'Headline-style capitalization (CMS16 8.157).',
        'Use either an authoritative list of episodes or cue sheet for proper format if available.',
      ],
    },
    title: {
      description: 'Title of overall work (i.e. film, series, or collection).',
      rules: [
        'Headline-style capitalization (CMS16 8.157).',
        'Use LC authority version of title if available, though omit "(Motion picture)" when it is used.',
        'Do not use bold, underline, italics, or quotation marks.',
      ],
    },
    website: {
      description: 'Full, stable URL or permalink.',
      rules: [
        'Select the specific page most relevant to this entry.',
      ],
    },
    year: {
      description: 'Copyright, release, or air date of the accompanied work.',
      rules: [
        'Enter year alone, in Arabic numerals.',
        'The year should be year of release of accompanied work that the score is associated with, or publication in the case of collection or published score.',
      ],
    },
  };

  return tooltip[fieldName]
    ? tooltip[fieldName]
    : tooltip[fieldName.split('_id')[0]];
};
