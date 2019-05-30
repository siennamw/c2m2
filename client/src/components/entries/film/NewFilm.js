import React from 'react';

import NewEntry from '../NewEntry';

import FilmForm from './FilmForm';
import { CREATE_FILM } from '../../../mutations';
import { filmValidationSchema } from '../../../validationSchemas';

const NewFilm = () => (
  <NewEntry
    clearAfterSubmit
    title="New Film"
    gqlMutation={CREATE_FILM}
    yupSchema={filmValidationSchema}
    FormComponent={FilmForm}
  />
);

export default NewFilm;
