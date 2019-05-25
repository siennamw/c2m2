import React from 'react';

import NewEntry from '../NewEntry';

import ProductionCompanyForm from './ProductionCompanyForm';
import { CREATE_PRODUCTION_COMPANY } from '../../../mutations';
import { productionCompanyValidationSchema } from '../../../validationSchemas';

const NewProductionCompany = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={ProductionCompanyForm}
    gqlMutation={CREATE_PRODUCTION_COMPANY}
    title="New Production Company"
    yupSchema={productionCompanyValidationSchema}
  />
);

export default NewProductionCompany;
