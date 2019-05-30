import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_FILM } from '../../../mutations';
import { FILM_BY_ID } from '../../../queries';
import { addIdToSchema, filmValidationSchema } from '../../../validationSchemas';

import FilmForm from './FilmForm';

const EditFilm = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(filmValidationSchema);

  return (
    <EditEntry
      FormComponent={FilmForm}
      gqlQuery={FILM_BY_ID}
      gqlMutation={UPDATE_FILM}
      id={id}
      mutationName="updateFilm"
      queryName="film"
      title="Edit Film"
      yupSchema={schema}
    />
  );
};

export default EditFilm;
