import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_MEDIA_TYPE } from '../../../mutations';
import { MEDIA_TYPE_BY_ID } from '../../../queries';
import { addIdToSchema, mediaTypeValidationSchema } from '../../../validationSchemas';

import MediaTypeForm from './MediaTypeForm';

const EditMediaType = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(mediaTypeValidationSchema);

  return (
    <EditEntry
      FormComponent={MediaTypeForm}
      gqlQuery={MEDIA_TYPE_BY_ID}
      gqlMutation={UPDATE_MEDIA_TYPE}
      id={id}
      queryName="media_type"
      title="Edit Media Type"
      yupSchema={schema}
    />
  );
};

export default EditMediaType;
