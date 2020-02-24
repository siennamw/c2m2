import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../AuthContext';

import MediaTypeForm from './MediaTypeForm';
import NewEntry from '../NewEntry';
import StatusMessage from '../../StatusMessage';

import { CREATE_MEDIA_TYPE } from '../../../mutations';
import { mediaTypeValidationSchema } from '../../../validationSchemas';

const NewMediaType = ({ successCallback }) => {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return (
      <StatusMessage
        message="Sorry! Only administrators can create media types."
        type="error"
      />
    );
  }

  return (
    <NewEntry
      successCallback={successCallback}
      clearAfterSubmit
      FormComponent={MediaTypeForm}
      gqlMutation={CREATE_MEDIA_TYPE}
      mutationName="createMediaType"
      title="New Media Type"
      yupSchema={mediaTypeValidationSchema}
    />
  );
};

NewMediaType.defaultProps = {
  successCallback: null,
};

NewMediaType.propTypes = {
  successCallback: PropTypes.func,
};

export default NewMediaType;
