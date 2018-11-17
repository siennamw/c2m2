import * as Yup from 'yup';

export const countryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  description: Yup.string(),
});

export const repositoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  location: Yup.string()
    .required('Location is required'),
  website: Yup.string()
    .url('Website is not a valid URL'),
});

