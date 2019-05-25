import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_PRODUCTION_COMPANY } from '../../../mutations';
import { PRODUCTION_COMPANY_BY_ID } from '../../../queries';
import { addIdToSchema, productionCompanyValidationSchema } from '../../../validationSchemas';

import ProductionCompanyForm from './ProductionCompanyForm';

const EditProductionCompany = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(productionCompanyValidationSchema);

  return (
    <EditEntry
      FormComponent={ProductionCompanyForm}
      gqlQuery={PRODUCTION_COMPANY_BY_ID}
      gqlMutation={UPDATE_PRODUCTION_COMPANY}
      id={id}
      mutationName="updateProductionCompany"
      queryName="production_company"
      title="Edit Production Company"
      yupSchema={schema}
    />
  );
};

export default EditProductionCompany;
