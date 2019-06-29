import * as Yup from 'yup';
import { FIELD_TO_PLURAL } from './constants';

const stringOfDigitsRegex = /^\d+$/;

export const getNormalizedSubmissionValuesForSchema = (schema, values) => {
  // strip empty strings
  const normalizedValues = Object.keys(values).reduce((result, key) => {
    if (values[key] === '') return result;
    result[key] = values[key];
    return result;
  }, {});

  return schema.cast(normalizedValues);
};

export const getInitialFormValuesForSchema = (schema, values) => {
  // for new entry, get default values from validation schema
  const vals = values || schema.cast({});

  let k;

  return Object.keys(schema.fields).reduce((result, key) => {
    if (key.includes('_ids')) {
      // extract array of ids from array of objects
      [k] = key.split('_ids');
      k = FIELD_TO_PLURAL[k] ? FIELD_TO_PLURAL[k] : `${k}s`;

      result[key] = vals[k]
        ? vals[k].reduce((a, i) => {
          a.push(i.id);
          return a;
        }, [])
        : [];
    } else if (key.includes('_id')) {
      // extract single id from object
      [k] = key.split('_id');
      result[key] = vals[k] && vals[k].id
        ? values[k].id
        : undefined;
    } else if (typeof vals[key] === 'boolean') {
      // preserve boolean values
      result[key] = vals[key];
    } else {
      // fall back to '' for undefined/null to initialize
      // controlled form fields
      result[key] = vals[key] ? vals[key] : '';
    }
    return result;
  }, {});
};

export const catalogerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  email: Yup.string()
    .trim()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  description: Yup.string()
    .trim(),
  admin: Yup.boolean()
    .default(false)
    .required('Admin yes/no is required'),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required'),
});

export const collectionValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  description: Yup.string()
    .trim(),
  repository_id: Yup.string()
    .matches(stringOfDigitsRegex)
    .required('Repository is required'),
});

export const composerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  imdb_link: Yup.string()
    .url('Website is not a valid URL'),
});

export const countryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  description: Yup.string()
    .trim(),
});

export const directorValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  imdb_link: Yup.string()
    .url('Website is not a valid URL'),
});

export const filmValidationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required'),
  secondary_title: Yup.string()
    .trim(),
  alias_alternates: Yup.string()
    .trim(),
  imdb_link: Yup.string()
    .url('Website is not a valid URL'),
  year: Yup.number()
    .integer('Year must be an integer')
    .positive('Year must be a positive number')
    .min(1900, 'Year must be 1900 or after')
    .required('Year is required'),
  country_id: Yup.string()
    .matches(stringOfDigitsRegex),
  media_type_id: Yup.string()
    .matches(stringOfDigitsRegex)
    .required('Media type is required'),
  composer_ids: Yup.array()
    .default([])
    .of(Yup.string().matches(stringOfDigitsRegex)),
  director_ids: Yup.array()
    .default([])
    .of(Yup.string().matches(stringOfDigitsRegex)),
  orchestrator_ids: Yup.array()
    .default([])
    .of(Yup.string().matches(stringOfDigitsRegex)),
  production_company_ids: Yup.array()
    .default([])
    .of(Yup.string().matches(stringOfDigitsRegex)),
});

export const materialFormatValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  description: Yup.string()
    .trim(),
});

export const mediaTypeValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  description: Yup.string()
    .trim(),
});

export const productionCompanyValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  contact_info: Yup.string()
    .trim(),
});

export const repositoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  location: Yup.string()
    .trim()
    .required('Location is required'),
  website: Yup.string()
    .url('Website is not a valid URL'),
});

export const workValidationSchema = Yup.object().shape({
  digital_copy_link: Yup.string()
    .url('Digital copy link is not a valid URL'),
  finding_aid_link: Yup.string()
    .url('Finding aid link is not a valid URL'),
  citation_source: Yup.string()
    .trim(),
  cataloging_notes: Yup.string()
    .trim(),
  film_id: Yup.string()
    .matches(stringOfDigitsRegex)
    .required('Film is required'),
  material_format_id: Yup.string()
    .matches(stringOfDigitsRegex)
    .required('Material format is required'),
  collection_ids: Yup.array()
    .default([])
    .of(Yup.string().matches(stringOfDigitsRegex)),
  publication_status: Yup.string()
    .oneOf(['draft', 'provisional', 'approved'])
    .default('draft')
    .required('Publication status is required'),
});

export const addIdToSchema = baseSchema => (
  baseSchema.shape({
    id: Yup.number()
      .integer('ID is invalid')
      .positive('ID is invalid')
      .required('ID is required'),
  })
);
