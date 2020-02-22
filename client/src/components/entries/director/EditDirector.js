import React from 'react';
import PropTypes from 'prop-types';

import EditEntry from '../EditEntry';

import { UPDATE_DIRECTOR } from '../../../mutations';
import { DIRECTOR_BY_ID } from '../../../queries';
import { addIdToSchema, directorValidationSchema } from '../../../validationSchemas';

import DirectorForm from './DirectorForm';

const EditDirector = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(directorValidationSchema);

  return (
    <EditEntry
      FormComponent={DirectorForm}
      gqlQuery={DIRECTOR_BY_ID}
      gqlMutation={UPDATE_DIRECTOR}
      id={id}
      mutationName="updateDirector"
      queryName="director"
      title="Edit Director"
      yupSchema={schema}
    />
  );
};

EditDirector.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditDirector;
