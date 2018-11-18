import React from "react";
import { Mutation } from "react-apollo";

import { isEmpty } from 'lodash';

import MediaTypeForm from './MediaTypeForm';
import { CREATE_MEDIA_TYPE } from '../../../mutations';
import { mediaTypeValidationSchema } from '../../../validationSchemas';

const NewMediaType = () => {
  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    try {
      const payload = {
        variables: {
          name: values.name,
          description: values.description ? values.description : null,
        }
      };
      const { data } = await mutation(payload);

      if (data && !isEmpty(data)) {
        resetForm();
        setStatus({
          type: 'success',
          message: 'Success!',
        });
      } else {
        setStatus({
          type: 'error',
          message: 'Failed. Please try again later.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message,
      });
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h3>New Media Type</h3>
      <Mutation mutation={CREATE_MEDIA_TYPE}>
        {(mutation) => (
          <MediaTypeForm mutation={mutation}
                       handleSubmit={handleSubmit}
                       validationSchema={mediaTypeValidationSchema}/>
        )}
      </Mutation>
    </div>
  );
};

export default NewMediaType;
