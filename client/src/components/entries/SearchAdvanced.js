import * as Yup from 'yup';
import React, { useState, Fragment } from 'react';
import { Form, Formik, useFormikContext } from 'formik';

import InputField from './InputField';
import SelectField from './SelectField';
import WorksList from './work/WorksList';

import { reactSelectOnChange } from '../../utils';

const InnerAdvancedSearchForm = () => {
  const {
    values,
    isSubmitting,
    setFieldTouched,
    setFieldValue,
  } = useFormikContext();

  const selectOnBlur = (field) => {
    setFieldTouched(field, true);
  };

  const selectOnChange = (evt, name) => {
    reactSelectOnChange(evt, name, setFieldValue);
  };

  const allOrAnyOptions = [
    {
      name: 'Match all criteria',
      id: 'all',
    },
    {
      name: 'Match any criteria',
      id: 'any',
    },
  ];

  return (
    <Form>
      <SelectField
        fieldName="allOrAny"
        onBlur={selectOnBlur}
        displayName="Search Type"
        onChange={selectOnChange}
        options={allOrAnyOptions}
        selected={values.allOrAny}
      />
      <InputField
        displayName="Keyword"
        fieldName="keyword"
      />
      <InputField
        displayName="Composer"
        fieldName="composer"
      />
      <InputField
        displayName="Title"
        fieldName="title"
      />
      <InputField
        displayName="Director"
        fieldName="director"
      />
      <label htmlFor={['start', 'end']}>
        Date Range
        <InputField
          displayName="Starting Year"
          fieldName="dateRangeStart"
          fieldType="number"
          id="start"
        />
        <InputField
          displayName="Ending Year"
          fieldName="dateRangeEnd"
          fieldType="number"
          id="end"
        />
      </label>
      <InputField
        displayName="Production Company"
        fieldName="productionCompany"
      />
      <InputField
        displayName="Country"
        fieldName="country"
      />
      <button
        className="button-primary u-full-width"
        disabled={isSubmitting}
        type="submit"
      >
        Submit
      </button>
    </Form>
  );
};

const SearchAdvanced = () => {
  const [showResults, setShowResults] = useState(false);
  const [filter, setFilter] = useState({});

  const date = new Date();
  const year = date.getFullYear();

  function validateDateRange() {
    // eslint-disable-next-line react/no-this-in-sfc
    const { dateRangeStart, dateRangeEnd } = this.parent;
    if (!dateRangeStart || !dateRangeEnd) {
      return true;
    }
    return dateRangeEnd >= dateRangeStart;
  }

  const validationSchema = Yup.object().shape({
    allOrAny: Yup.string()
      .label('Search Type')
      .oneOf(['all', 'any']),
    composer: Yup.string()
      .label('Composer')
      .trim(),
    country: Yup.string()
      .label('Country')
      .trim(),
    dateRangeEnd: Yup.number()
      .label('End')
      .min(1900)
      .max(year)
      .test('yearValidation', 'Ending Year must be after Starting Year', validateDateRange),
    dateRangeStart: Yup.number()
      .label('Start')
      .min(1900)
      .max(year)
      .test('yearValidation', 'Starting Year must be before Ending Year', validateDateRange),
    director: Yup.string()
      .label('Director')
      .trim(),
    title: Yup.string()
      .label('Title')
      .trim(),
    keyword: Yup.string()
      .label('Keyword')
      .trim(),
    productionCompany: Yup.string()
      .label('Production Company')
      .trim(),
  });

  const handleSubmit = ({
    allOrAny,
    dateRangeEnd,
    dateRangeStart,
    ...rest
  }, { setSubmitting }) => {
    // strip out empty strings

    const newFilter = {
      // date ranges always in same scope, even if one is missing
      dateRangeEnd: dateRangeEnd || undefined,
      dateRangeStart: dateRangeStart || undefined,
    };

    if (allOrAny === 'all') {
      // match all criteria
      Object.keys(rest).forEach((key) => {
        if (rest[key]) {
          newFilter[key] = rest[key];
        }
      });
    } else {
      // match any criteria
      newFilter.OR = Object.keys(rest).map((key) => {
        if (rest[key]) {
          return { [key]: rest[key] };
        }
        return null;
      }).filter((value) => !!value);
    }

    setFilter(newFilter);
    setShowResults(true);
    setSubmitting(false);
  };

  return (
    <Fragment>
      <h2>Advanced Search</h2>
      <p>Search for a specific work using more detailed information.</p>
      <Formik
        initialValues={{
          allOrAny: 'all',
          composer: '',
          country: '',
          dateRangeEnd: year,
          dateRangeStart: 1900,
          director: '',
          title: '',
          keyword: '',
          productionCompany: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <InnerAdvancedSearchForm />
      </Formik>
      {
        showResults
          ? <WorksList filter={filter} />
          : undefined
      }
    </Fragment>
  );
};

export default SearchAdvanced;
