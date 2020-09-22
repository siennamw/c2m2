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
    title_contains: title,
    OR: {
      secondary_title_contains: title,
      OR: { alias_alternates_contains: title },
    },
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
