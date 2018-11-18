import React from "react";
import { Mutation } from "react-apollo";

import { isEmpty } from 'lodash';

import MaterialFormatForm from './MaterialFormatForm';
import { CREATE_MATERIAL_FORMAT } from '../../../mutations';
import { materialFormatValidationSchema } from '../../../validationSchemas';

const NewMaterialFormat = () => {
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
      <h3>New Material Format</h3>
      <Mutation mutation={CREATE_MATERIAL_FORMAT}>
        {(mutation) => (
          <MaterialFormatForm mutation={mutation}
                              handleSubmit={handleSubmit}
                              validationSchema={materialFormatValidationSchema}/>
        )}
      </Mutation>
    </div>
  );
};

export default NewMaterialFormat;
