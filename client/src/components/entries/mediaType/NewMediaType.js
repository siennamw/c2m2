import React from 'react';

import NewEntry from '../NewEntry';

import MediaTypeForm from './MediaTypeForm';
import { CREATE_MEDIA_TYPE } from '../../../mutations';
import { mediaTypeValidationSchema } from '../../../validationSchemas';

const NewMediaType = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={MediaTypeForm}
    gqlMutation={CREATE_MEDIA_TYPE}
    title="New Media Type"
    yupSchema={mediaTypeValidationSchema}
  />
);

export default NewMediaType;
