import React from 'react';
import PropTypes from 'prop-types';

import EditEntry from '../EditEntry';

import { UPDATE_COMPOSER } from '../../../mutations';
import { COMPOSER_BY_ID } from '../../../queries';
import { addIdToSchema, composerValidationSchema } from '../../../validationSchemas';

import ComposerForm from './ComposerForm';

const EditComposer = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(composerValidationSchema);

  return (
    <EditEntry
      FormComponent={ComposerForm}
      gqlQuery={COMPOSER_BY_ID}
      gqlMutation={UPDATE_COMPOSER}
      id={id}
      mutationName="updateComposer"
      queryName="composer"
      title="Edit Composer"
      yupSchema={schema}
    />
  );
};

EditComposer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditComposer;
