import React from 'react';
import PropTypes from 'prop-types';

import EditEntry from '../EditEntry';

import { UPDATE_RESOURCE } from '../../../mutations';
import { RESOURCE_BY_ID } from '../../../queries';
import { addIdToSchema, resourceValidationSchema } from '../../../validationSchemas';

import ResourceForm from './ResourceForm';

const EditResource = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(resourceValidationSchema);

  return (
    <EditEntry
      FormComponent={ResourceForm}
      gqlQuery={RESOURCE_BY_ID}
      gqlMutation={UPDATE_RESOURCE}
      id={id}
      mutationName="updateResource"
      queryName="resource"
      title="Edit Resource"
      yupSchema={schema}
    />
  );
};

EditResource.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditResource;
