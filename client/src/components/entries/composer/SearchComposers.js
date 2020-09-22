import React from 'react';
import * as Yup from 'yup';

import SimpleEntrySearchForm from '../SimpleEntrySearchForm';
import ComposersList from './ComposersList';

const SearchComposers = () => {
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
      ResultsComponent={ComposersList}
      validationSchema={validationSchema}
    />
  );
};

export default SearchComposers;
