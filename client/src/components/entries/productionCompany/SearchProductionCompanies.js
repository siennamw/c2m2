import React from 'react';
import * as Yup from 'yup';

import SimpleEntrySearchForm from '../SimpleEntrySearchForm';
import ProductionCompaniesList from './ProductionCompaniesList';

const SearchProductionCompanies = () => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
  });

  const filterBuilder = (name) => ({
    name_contains: name,
  });

  return (
    <SimpleEntrySearchForm
      fieldName="name"
      filterBuilder={filterBuilder}
      label="Name"
      ResultsComponent={ProductionCompaniesList}
      validationSchema={validationSchema}
    />
  );
};

export default SearchProductionCompanies;
