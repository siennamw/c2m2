import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import ProductionCompanyForm from './ProductionCompanyForm';
import { CREATE_PRODUCTION_COMPANY } from '../../../mutations';
import { productionCompanyValidationSchema } from '../../../validationSchemas';

const NewProductionCompany = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    FormComponent={ProductionCompanyForm}
    gqlMutation={CREATE_PRODUCTION_COMPANY}
    mutationName="createProductionCompany"
    title="New Production Company"
    yupSchema={productionCompanyValidationSchema}
  />
);

NewProductionCompany.defaultProps = {
  successCallback: null,
};

NewProductionCompany.propTypes = {
  successCallback: PropTypes.func,
};

export default NewProductionCompany;
