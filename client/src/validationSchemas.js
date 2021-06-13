/* eslint-disable no-param-reassign */
import * as Yup from 'yup';

import { fieldNameToPlural } from './utils';

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
      k = fieldNameToPlural(k);

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
        : '';
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

function validateDateRange() {
  // eslint-disable-next-line react/no-this-in-sfc
  const { year_start, year_end } = this.parent;
  if (!year_start || !year_end) {
    return true;
  }
  return year_end >= year_start;
}

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
});

export const collectionValidationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required'),
  description: Yup.string()
    .trim(),
  finding_aid_link: Yup.string()
    .url('Finding aid link is not a valid URL'),
  repository_id: Yup.string()
    .uuid('Repository ID is invalid')
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

export const workValidationSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .required('Title is required'),
  secondary_title: Yup.string()
    .trim(),
  alias_alternates: Yup.string()
    .trim(),
  imdb_link: Yup.string()
    .url('Website is not a valid URL'),
  year_start: Yup.number()
    .integer('Starting Year must be an integer')
    .min(1900, 'Starting Year must be 1900 or after')
    .test('yearValidation', 'Starting Year must be same as or before Ending Year', validateDateRange),
  year_end: Yup.number()
    .integer('Ending Year must be an integer')
    .min(1900, 'Ending Year must be 1900 or after')
    .test('yearValidation', 'Ending Year must be same as or after Starting Year', validateDateRange),
  country_id: Yup.string()
    .uuid('Country ID is invalid'),
  media_type_id: Yup.string()
    .uuid('Media type ID is invalid')
    .required('Media type is required'),
  composer_ids: Yup.array()
    .default([])
    .of(Yup.string().uuid('Composer ID is invalid')),
  director_ids: Yup.array()
    .default([])
    .of(Yup.string().uuid('Director ID is invalid')),
  orchestrator_ids: Yup.array()
    .default([])
    .of(Yup.string().uuid('Orchestrator ID is invalid')),
  production_company_ids: Yup.array()
    .default([])
    .of(Yup.string().uuid('Production company ID is invalid')),
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

export const resourceValidationSchema = Yup.object().shape({
  digital_copy_link: Yup.string()
    .url('Digital copy link is not a valid URL'),
  citation_source: Yup.string()
    .trim(),
  cataloging_notes: Yup.string()
    .trim(),
  work_id: Yup.string()
    .uuid('Work ID is invalid')
    .required('Work is required'),
  material_format_id: Yup.string()
    .uuid('Material format ID is invalid')
    .required('Material format is required'),
  collection_ids: Yup.array()
    .of(Yup.string().uuid('Collection ID is invalid'))
    .required('Collection is required'),
  publication_status: Yup.string()
    .oneOf(['draft', 'provisional', 'approved'])
    .default('draft')
    .required('Publication status is required'),
});

export const addIdToSchema = (baseSchema) => (
  baseSchema.shape({
    id: Yup.string()
      .uuid('ID is not valid')
      .required('ID is required'),
  })
);

export const addPasswordsToSchema = (baseSchema) => (
  baseSchema.shape({
    password: Yup.string()
      .min(6, 'Password must be longer than 6 characters')
      .required('Password is required'),
    new_password: Yup.string()
      .min(6, 'Password must be longer than 6 characters'),
  })
);
