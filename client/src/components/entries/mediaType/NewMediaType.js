import React from "react";

import NewEntry from '../NewEntry';

import MediaTypeForm from './MediaTypeForm';
import { CREATE_MEDIA_TYPE } from '../../../mutations';
import { mediaTypeValidationSchema } from '../../../validationSchemas';

const NewMediaType = () => {
  return (
    <NewEntry
      title='New Media Type'
      variablesList={Object.keys(mediaTypeValidationSchema.fields)}
      gqlMutation={CREATE_MEDIA_TYPE}
      yupSchema={mediaTypeValidationSchema}
      FormComponent={MediaTypeForm}
    />
  );
};

export default NewMediaType;
