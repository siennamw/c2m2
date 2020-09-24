import React from 'react';
import * as Yup from 'yup';

import SimpleEntrySearchForm from '../SimpleEntrySearchForm';
import WorksList from './WorksList';

const SearchWorks = () => {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required'),
  });

  const filterBuilder = (title) => ({
    title,
  });

  return (
    <SimpleEntrySearchForm
      fieldName="title"
      filterBuilder={filterBuilder}
      label="Title"
      ResultsComponent={WorksList}
      validationSchema={validationSchema}
    />
  );
};

export default SearchWorks;
