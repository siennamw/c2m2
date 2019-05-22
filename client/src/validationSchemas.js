import * as Yup from 'yup';

export const catalogerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  email: Yup.string()
    .email('E-mail is not valid')
    .required('E-mail is required'),
  description: Yup.string(),
  password: Yup.string()
    .min(6, 'Password must be longer than 6 characters')
    .required('Password is required'),
});

export const collectionValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string(),
  repository_id: Yup.number()
    .integer('Number must be an integer')
    .positive('Number must be positive')
    .moreThan(0, 'Number must be greater than 0'),
});

export const composerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  imdb_link: Yup.string()
    .url('Website is not a valid URL'),
});

export const countryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string(),
});

export const directorValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  imdb_link: Yup.string()
    .url('Website is not a valid URL'),
});

export const materialFormatValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string(),
});

export const mediaTypeValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string(),
});

export const productionCompanyValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  contact_info: Yup.string(),
});

export const publisherValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  contact_info: Yup.string(),
});

export const repositoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  location: Yup.string()
    .required('Location is required'),
  website: Yup.string()
    .url('Website is not a valid URL'),
});

export const workValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Title is required'),
  secondary_title: Yup.string(),
  alias_alternates: Yup.string(),
  year: Yup.number()
    .integer('Year must be an integer')
    .positive('Year must be a positive number')
    .min(1900, 'Year must be 1900 or after')
    .required('Year is required'),
  digital_copy_link: Yup.string()
    .url('Digital copy link is not a valid URL'),
  finding_aid_link: Yup.string()
    .url('Finding aid link is not a valid URL'),
  rights_holder: Yup.string(),
  citation_source: Yup.string(),
  cataloging_notes: Yup.string(),
  country_id: Yup.number()
    .integer()
    .positive(),
  media_type_id: Yup.number()
    .integer()
    .positive()
    .required('Media type is required'),
  material_format_id: Yup.number()
    .integer()
    .positive()
    .required('Material format is required'),
  collection_ids: Yup.array()
    .of(Yup.number().integer().positive()),
  composer_ids: Yup.array()
    .of(Yup.number().integer().positive()),
  director_ids: Yup.array()
    .of(Yup.number().integer().positive()),
  production_company_ids: Yup.array()
    .of(Yup.number().integer().positive()),
  publisher_ids: Yup.array()
    .of(Yup.number().integer().positive()),
  publication_status: Yup.string()
    .oneOf(['draft', 'provisional', 'approved'])
    .default('draft')
    .required('Publication status is required'),
});

export const addIdToSchema = baseSchema => (
  baseSchema.shape({
    id: Yup.number()
      .integer()
      .positive()
      .required(),
  })
);
