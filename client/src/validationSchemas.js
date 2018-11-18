import * as Yup from 'yup';

export const composerValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  imdb_link: Yup.string(),
});

export const countryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string(),
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

