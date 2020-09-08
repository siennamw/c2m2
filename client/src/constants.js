import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

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
const doNotUseAliases = 'Do not use nicknames or aliases in this field.';
const freeFieldForFurtherDescription = 'Free field for further description.';
const headlineStyleCapitalization = 'Headline-style capitalization (CMS16 8.157).';
const imbdAbbreviation = 'IMDB links will be abbreviated automatically if possible.';
const imdbPersonSearch = (
  <Fragment>
    <a
      href="https://www.imdb.com/search/name/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Search IMDB
    </a>
    {' for the entry associated with this person, then copy and paste the full URL here.'}
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
    </a>
    {' for the entry associated with this item, then copy and paste the full URL here.'}
  </Fragment>
);
const includeBirthAndDeathDates = 'If possible, include birth and death dates even if not included in the LC authority version.';
const includeProtocol = 'Include http:// or https://.';
const lcAuthorityName = 'Always use LC authority version of name if available.';
const MaterialFormatsListLink = (
  <Fragment>
    {'Material format of the resource. See '}
    <Link
      to="/dashboard/material-formats"
      target="_blank"
    >
      descriptions of material formats
    </Link>
    .
  </Fragment>
);
const MediaTypesListLink = (
  <Fragment>
    {'Media type of work. See '}
    <Link
      to="/dashboard/media-types"
      target="_blank"
    >
      descriptions of media types
    </Link>
    .
  </Fragment>
);
const noImdbPage = 'If no associated IMDB page exists, leave blank.';
const passwordSemantics = (
  <Fragment>
    {'Choose or '}
    <a
      href="https://www.lastpass.com/password-generator"
      target="_blank"
      rel="noopener noreferrer"
    >
      generate
    </a>
    {' a strong password that is only used on this site.'}
  </Fragment>
);
const shortestLink = 'Use shortest link possible.';
const websiteUnavailable = 'If no website available, leave blank.';

export const tooltip = {
  cataloger: {
    admin: {
      semantics: 'Administrators can approve entries for resources, create and modify other catalogers, and perform bulk uploads.',
    },
    description: {
      semantics: 'Title, institutional affiliation, or other description.',
    },
    email: {
      semantics: 'The email address at which cataloger may be reached by project administrators and other contributors.',
    },
    name: {
      semantics: 'Full name.',
    },
    new_password: {
      semantics: passwordSemantics,
    },
    password: {
      semantics: passwordSemantics,
    },
  },
  collection: {
    description: {
      semantics: freeFieldForFurtherDescription,
      rules: [
        'Consider copying a portion of the collection scope and content note.',
      ],
    },
    finding_aid_link: {
      semantics: 'Link to online finding aid.',
      rules: [
        shortestLink,
        includeProtocol,
        websiteUnavailable,
      ],
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
        doNotUseAliases,
        'If special/private library, name of institution goes here (i.e. Newberry Library).',
      ],
    },
  },
  composer: {
    imdb_link: {
      semantics: 'Link for IMDB entry of composer.',
      rules: [
        imdbPersonSearch,
        noImdbPage,
        imbdAbbreviation,
      ],
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
      rules: [
        'If country has been renamed or no longer exists, include that information here.',
      ],
    },
    name: {
      semantics: 'Official name of country of production.',
      rules: [
        'Use Getty Thesaurus of Geographic Names for authority version of country.',
        doNotUseAliases,
      ],
    },
  },
  director: {
    imdb_link: {
      semantics: 'Link for IMDB entry of director.',
      rules: [
        imdbPersonSearch,
        noImdbPage,
        imbdAbbreviation,
      ],
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
    imdb_link: {
      semantics: 'Link for IMDB entry of production company.',
      rules: [
        imdbTitleSearch,
        noImdbPage,
        imbdAbbreviation,
      ],
    },
    name: {
      semantics: 'Name of production company as listed in IMDB.',
    },
  },
  repository: {
    location: {
      semantics: 'Sheltering institution, city, and state of institution.',
      rules: [
        headlineStyleCapitalization,
        lcAuthorityName,
        'City and state/country.',
        doNotUseAliases,
        'Example: Bringham Young University, Provo, Utah.',
      ],
    },
    name: {
      semantics: 'Full name.',
      rules: [
        headlineStyleCapitalization,
        lcAuthorityName,
        doNotUseAliases,
      ],
    },
    website: {
      semantics: 'Link to repository website.',
      rules: [
        shortestLink,
        includeProtocol,
        websiteUnavailable,
      ],
    },
  },
  resource: {
    cataloging_notes: {
      semantics: 'Any other information pertinent to entry.',
      rules: [
        'Free field in which cataloger can place any other notes, unanswered questions, or relevant information regarding the entry.',
        'If material is a photocopy, indicate here.',
      ],
    },
    citation_source: {
      semantics: 'How information was found. Only required if associated collection has no finding aid link.',
      rules: [
        'Free field to describe how information was discovered.',
      ],
    },
    collection: {
      semantics: 'Official name of collection with manuscripts.',
      rules: [
        'Use name as given by the holding repository.',
      ],
    },
    digital_copy_link: {
      semantics: 'Link to digital copy of collection.',
      rules: [
        'Full, stable URL or permalink to a digital copy of the resource or as close to the resource as possible.',
        'Only legal copies should be linked.',
      ],
    },
    material_format: {
      semantics: MaterialFormatsListLink,
      rules: [
        'Physical format of the archival material.',
      ],
    },
    publication_status: {
      semantics: 'The status of this catalog entry.',
      rules: [
        'A draft entry is only visible to other catalogers.',
        'A provisional entry is visible to the public and is displayed with a warning that the entry has not yet been approved by a project administrator.',
        'An approved entry has been reviewed by a project administrator and is displayed with a note to that effect.',
      ],
    },
    work: {
      semantics: 'Work/media associated with this resource.',
    },
  },
  work: {
    alias_alternates: {
      semantics: 'Aliases used by creators and alternate forms of title.',
      rules: [
        'Free field for any alternate forms of the title of work.',
      ],
    },
    composer: {
      semantics: 'Primary composer(s) of musical work.',
    },
    country: {
      semantics: 'Official name of country of production.',
      rules: [
        'Primary country where production company, or primary commercial market for film, is located.',
      ],
    },
    director: {
      semantics: 'Primary director(s) of work.',
    },
    imdb_link: {
      semantics: 'Link for IMDB entry of work.',
      rules: [
        imdbTitleSearch,
        noImdbPage,
        imbdAbbreviation,
      ],
    },
    media_type: {
      semantics: MediaTypesListLink,
      rules: [
        'Primary media type of the work.',
        'Films and Series released/produced via streaming services (i.e. Netflix, Hulu, Amazon) or in a web first format (i.e. YouTube, Vimeo, or self-published on a personal site) are to be categorized under whatever film or series format that best fits the work.',
        '"Serial Series" is any series that comes out at periodic intervals, and has multiple episodes that constitute a whole. This can include on-going or mini-series.',
      ],
    },
    orchestrator: {
      semantics: 'Primary orchestrator(s) of musical work.',
    },
    production_company: {
      semantics: 'Corporate body that produced or financed a accompanied work.',
      rules: [
        'Use version of name listed in IMDB.',
        'Include top two production companies listed in IMDB entry, any additional entries are optional for inclusion.',
      ],
    },
    secondary_title: {
      semantics: 'Title of sub work (i.e. cue, episode, etc.).',
      rules: [
        headlineStyleCapitalization,
        'Use either an authoritative list of episodes or cue sheet for proper format if available.',
        'If no authoritative version is available, use work itself.',
        'Can also be used to provide English translation of foreign tiles.',
      ],
    },
    title: {
      semantics: 'Title of overall work (i.e. film, series, or collection).',
      rules: [
        headlineStyleCapitalization,
        'Use LC authority version of title if available, though omit "(Motion picture)" when it is used.',
        'Omit date from title as well.',
        'Omit initial articles from titles, but put full title in alias field.',
      ],
    },
    year: {
      semantics: 'Copyright, release, or air date of the work.',
      rules: [
        'Enter year alone, in Arabic numerals.',
        'The year should be year of release of work within its market of production. Use earliest release date in market. The date listed in the IMDB header on the top of the film\'s entry can be considered authoritative.',
      ],
    },
  },
};

export const TOOLTIP_BY_MODEL_AND_FIELD = (model, fieldName) => {
  if (!tooltip[model]) return undefined;

  return tooltip[model][fieldName]
    ? tooltip[model][fieldName]
    : tooltip[model][fieldName.split('_id')[0]];
};
