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
    .required('Password is required')
});

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

export const directorValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  imdb_link: Yup.string(),
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

