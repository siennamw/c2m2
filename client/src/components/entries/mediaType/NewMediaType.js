import React from 'react';

import NewEntry from '../NewEntry';

import MediaTypeForm from './MediaTypeForm';
import { CREATE_MEDIA_TYPE } from '../../../mutations';
import { mediaTypeValidationSchema } from '../../../validationSchemas';

const NewMediaType = () => (
  <NewEntry
    title="New Media Type"
    gqlMutation={CREATE_MEDIA_TYPE}
    yupSchema={mediaTypeValidationSchema}
    FormComponent={MediaTypeForm}
  />
);

export default NewMediaType;
