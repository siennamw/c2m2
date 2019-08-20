import React, { Fragment } from 'react';

export const LOCAL_STORAGE_KEY = 'c2m2-auth';

// for field names that cannot be changed to plural with the addition of 's'
export const FIELD_TO_PLURAL = {
  country: 'countries',
  production_company: 'production_companies',
  repository: 'repositories',
};

export const MODEL_NAMES = [
  'cataloger',
  'collection',
  'composer',
  'country',
  'director',
  'material_format',
  'media_type',
  'production_company',
  'repository',
  'resource',
  'work',
];

// repeated values for TOOLTIP_BY_MODEL_AND_FIELD below
const doNotUseAliases = 'Do not use aliases in this field.';
const freeFieldForFurtherDescription = 'Free field for further description.';
const headlineStyleCapitalization = 'Headline-style capitalization (CMS16 8.157).';
const imdbPersonSearch = (
  <Fragment>
    <a
      href="https://www.imdb.com/search/name"
      target="_blank"
      rel="noopener noreferrer"
    >
      Search IMDB
    </a> for the entry associated with this person, then copy and paste the full
    URL here.
  </Fragment>
);
const imdbTitleSearch = (
  <Fragment>
    <a
      href="https://www.imdb.com/search/title/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Search IMDB
    </a> for the entry associated with this item, then copy and paste the full
    URL here.
  </Fragment>
);
const includeBirthAndDeathDates = 'Include birth and death dates.';
const lcAuthorityName = 'Use LC authority version of name if available.';
const passwordSemantics = (
  <Fragment>
    Choose or <a
    href="https://www.lastpass.com/password-generator"
    target="_blank"
    rel="noopener noreferrer"
  >
    generate
  </a> a strong password that is only used on this site.
  </Fragment>
);

export const TOOLTIP_BY_MODEL_AND_FIELD = (model, fieldName) => {
  const tooltip = {
    cataloger: {
      admin: {
        semantics: 'Administrators can approve entries for resources and can create and modify other catalogers.',
      },
      description: {
        semantics: 'Title, institutional affiliation, or other description.',
      },
      email: {
        semantics: 'The email address at which project administrators and other contributors may contact you.',
      },
      name: {
        semantics: 'Full name.',
      },
      password: {
        semantics: passwordSemantics,
      },
    },
    collection: {
      description: {
        semantics: freeFieldForFurtherDescription,
      },
      name: {
        semantics: 'Official name of collection with manuscripts.',
        rules: [
          'Use name as given by the holding repository.',
        ],
      },
      repository: {
        semantics: 'Name of repository that contains the manuscripts.',
        rules: [
          headlineStyleCapitalization,
          lcAuthorityName,
          'Do not use nicknames of institutions in this field.',
        ],
      },
    },
    composer: {
      imdb_link: {
        semantics: imdbPersonSearch,
      },
      name: {
        semantics: 'Full name.',
        rules: [
          lcAuthorityName,
          includeBirthAndDeathDates,
          doNotUseAliases,
        ],
      },
    },
    country: {
      description: {
        semantics: freeFieldForFurtherDescription,
      },
      name: {
        semantics: 'Official name.',
        rules: [
          lcAuthorityName,
          'Use Getty Thesaurus of Geographic Names for authority version of country.',
          doNotUseAliases,
        ],
      },
    },
    director: {
      imdb_link: {
        semantics: imdbPersonSearch,
      },
      name: {
        semantics: 'Full name.',
        rules: [
          lcAuthorityName,
          includeBirthAndDeathDates,
          doNotUseAliases,
        ],
      },
    },
    material_format: {
      description: {
        semantics: freeFieldForFurtherDescription,
      },
      name: {
        semantics: 'Full name.',
        rules: [
          lcAuthorityName,
          doNotUseAliases,
        ],
      },
    },
    media_type: {
      description: {
        semantics: freeFieldForFurtherDescription,
      },
      name: {
        semantics: 'Full name.',
        rules: [
          lcAuthorityName,
          doNotUseAliases,
        ],
      },
    },
    production_company: {
      contact_info: {
        semantics: 'Public website, mailing address, or email address.',
        rules: [
          'Do not use individuals\' names or private contact information.',
        ],
      },
      name: {
        semantics: 'Full name.',
        rules: [
          'If corporation has changed names or merged since time of production, list name of company as it appeared during production and list current name in additional entry.',
          lcAuthorityName,
          doNotUseAliases,
        ],
      },
    },
    repository: {
      location: {
        semantics: 'Sheltering institution, city, and state of institution.',
        rules: [
          headlineStyleCapitalization,
          'Use LC authority version of institution name if available',
          'City and State/Country',
          'Do not use nicknames of intuitions in this field',
        ],
      },
      name: {
        semantics: 'Full name.',
        rules: [
          lcAuthorityName,
          doNotUseAliases,
        ],
      },
      website: {
        semantics: 'Full, stable URL or permalink.',
        rules: [
          'Select the specific page most relevant to this entry.',
        ],
      },
    },
    resource: {
      cataloging_notes: {
        semantics: 'Any other information pertinent to entry.',
        rules: [
          'Free field in which cataloger can place any other notes, unanswered questions, or relevant information regarding the entry.',
        ],
      },
      citation_source: {
        semantics: 'How information was found.',
        rules: [
          'Reference source (include citation for book following CMS16), or',
          'Article/book citation (include citation for article following CMS16), or',
          'Submission via C2M2 website (include name of submitter if they desire credit), or',
          'Coordinating project (include name and website of project), or',
          'C2M2 project research (include name of project member)',
        ],
      },
      collection: {
        semantics: 'Collection(s) in which the record is held.',
      },
      digital_copy_link: {
        semantics: 'Full, stable URL or permalink to a digital copy of the resource or as close to the resource as possible.',
        rules: [
          'Only legal copies should be linked',
        ],
      },
      work: {
        semantics: 'Work/media associated with this resource.',
      },
      finding_aid_link: {
        semantics: 'Full, stable URL or permalink to a finding aid.',
      },
      material_format: {
        semantics: 'Physical format of material in collection.',
      },
    },
    work: {
      alias_alternates: {
        semantics: 'Aliases used by creators and alternate forms of title.',
        rules: [
          'Free field for any aliases or alternate forms of the title.',
        ],
      },
      composer: {
        semantics: 'Composer(s) of musical work.',
      },
      country: {
        semantics: 'Official name of country of production.',
        rules: [
          'Primary country where production company, or primary commercial market for work, is located.',
        ],
      },
      director: {
        semantics: 'Director(s) of accompanied work.',
      },
      imdb_link: {
        semantics: imdbTitleSearch,
      },
      media_type: {
        semantics: 'Primary media type.',
        rules: [
          'Works and Series released/produced via streaming services (i.e. Netflix, Hulu, Amazon) or in a web-first format (i.e. YouTube, Vimeo, or self-published on a personal site) are to be categorized under whatever work or series format that best fits the work.',
          '"Serial Series" is any series that comes out at periodic intervals, and has multiple episodes that constitute a whole. This can include on-going or mini-series.',
        ],
      },
      orchestrator: {
        semantics: 'Orchestrator(s) of musical work.',
      },
      production_company: {
        semantics: 'Corporate body or bodies that produced or financed the accompanied work.',
        rules: [
          'If corporation has changed names or merged since time of production, include listing for the company as it appeared during production and listing for the company\'s current name.',
          'If multiple companies responsible for production, list all known entities and observe above rule regarding any alternate or new names.',
        ],
      },
      secondary_title: {
        semantics: 'Title of sub work (i.e. cue, episode, etc.).',
        rules: [
          headlineStyleCapitalization,
          'Use either authoritative list of episodes or cue sheet for proper format if available.',
          'If not available, use work itself.',
          'Can also be used to provide English translation of foreign tiles.',
        ],
      },
      title: {
        semantics: 'Title of overall work (i.e. work, series, or collection).',
        rules: [
          headlineStyleCapitalization,
          'Use LC authority version of title if available, though omit "(Motion picture)" when it is used.',
          'Do not use bold, underline, italics, or quotation marks.',
        ],
      },
      year: {
        semantics: 'Copyright, release, or air date of the accompanied work.',
        rules: [
          'Enter year alone, in Arabic numerals.',
          'The year should be year of release of accompanied work that the score is associated with, or publication in the case of collection or published score.',
        ],
      },
    },
  };

  if (!tooltip[model]) return undefined;

  return tooltip[model][fieldName]
    ? tooltip[model][fieldName]
    : tooltip[model][fieldName.split('_id')[0]];
};
