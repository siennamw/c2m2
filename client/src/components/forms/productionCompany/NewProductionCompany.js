import React from "react";

import NewEntry from '../../NewEntry';

import ProductionCompanyForm from './ProductionCompanyForm';
import { CREATE_PRODUCTION_COMPANY } from '../../../mutations';
import { productionCompanyValidationSchema } from '../../../validationSchemas';

const NewProductionCompany = () => {
  return (
    <NewEntry
      title='New Production Company'
      variablesList={Object.keys(productionCompanyValidationSchema.fields)}
      gqlMutation={CREATE_PRODUCTION_COMPANY}
      yupSchema={productionCompanyValidationSchema}
      FormComponent={ProductionCompanyForm}
    />
  );
};

export default NewProductionCompany;
