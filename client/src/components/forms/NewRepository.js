import React from "react";
import { Mutation } from "react-apollo";

import { isEmpty } from 'lodash';

import RepositoryForm from './RepositoryForm';
import { CREATE_REPOSITORY } from "../../mutations";
import { repositoryValidationSchema } from '../../validationSchemas';

const NewRepository = () => {
  const handleSubmit = async (mutation, values, setSubmitting, setStatus, resetForm) => {
    try {
      const payload = {
        variables: {
          name: values.name,
          location: values.location,
          website: values.website ? values.website : null,
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
      <h3>New Repository</h3>
      <Mutation mutation={CREATE_REPOSITORY}>
        {(mutation) => (
          <RepositoryForm mutation={mutation}
                          handleSubmit={handleSubmit}
                          validationSchema={repositoryValidationSchema}/>
        )}
      </Mutation>
    </div>
  );
};

export default NewRepository;
