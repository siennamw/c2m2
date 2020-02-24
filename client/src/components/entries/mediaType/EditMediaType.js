import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../AuthContext';

import EditEntry from '../EditEntry';
import MediaTypeForm from './MediaTypeForm';
import StatusMessage from '../../StatusMessage';

import { UPDATE_MEDIA_TYPE } from '../../../mutations';
import { MEDIA_TYPE_BY_ID } from '../../../queries';
import { addIdToSchema, mediaTypeValidationSchema } from '../../../validationSchemas';

const EditMediaType = ({ match }) => {
  const { admin } = useContext(AuthContext);
  const id = Number(match.params.id);
  const schema = addIdToSchema(mediaTypeValidationSchema);

  if (!admin) {
    return (
      <StatusMessage
        message="Sorry! Only administrators can edit media types."
        type="error"
      />
    );
  }

  return (
    <EditEntry
      FormComponent={MediaTypeForm}
      gqlQuery={MEDIA_TYPE_BY_ID}
      gqlMutation={UPDATE_MEDIA_TYPE}
      id={id}
      mutationName="updateMediaType"
      queryName="media_type"
      title="Edit Media Type"
      yupSchema={schema}
    />
  );
};

EditMediaType.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditMediaType;
