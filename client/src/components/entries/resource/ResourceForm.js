import React, { Fragment, useContext } from 'react';

import SelectFieldWithQuery from '../SelectFieldWithQuery';
import InputField from '../InputField';

import * as queries from '../../../queries';

import NewCollection from '../collection/NewCollection';
import NewWork from '../work/NewWork';
import SelectField from '../SelectField';
import { reactSelectOnChange } from '../../../utils';
import { AuthContext } from '../../App';

const ResourceForm = ({ setFieldTouched, setFieldValue, values }) => {
  const { admin } = useContext(AuthContext);

  const model = 'resource';

  const selectOnBlur = (field) => {
    setFieldTouched(field, true);
  };

  const selectOnChange = (evt, name) => {
    reactSelectOnChange(evt, name, setFieldValue);
  };

  const pubStatusOptions = [
    { id: 'draft', name: 'draft' },
    { id: 'provisional', name: 'provisional' },
  ];

  if (admin) pubStatusOptions.push({ id: 'approved', name: 'approved' });

  return (
    <Fragment>
      <SelectFieldWithQuery
        componentForModal={<NewWork />}
        displayName="Work"
        fieldName="work_id"
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_WORKS}
        queryName="allWorks"
        selected={values.work_id}
      />
      <InputField
        displayName="Finding Aid Link"
        fieldName="finding_aid_link"
        fieldType="url"
        modelName={model}
      />
      <InputField
        displayName="Digital Copy Link"
        fieldName="digital_copy_link"
        fieldType="url"
        modelName={model}
      />
      <InputField
        displayName="Citation Source"
        fieldName="citation_source"
        modelName={model}
      />
      <SelectFieldWithQuery
        disableAddButton
        displayName="Material Format"
        fieldName="material_format_id"
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_MATERIAL_FORMATS}
        queryName="allMaterialFormats"
        selected={values.material_format_id}
      />
      <SelectFieldWithQuery
        componentForModal={<NewCollection />}
        displayName="Collection(s)"
        fieldName="collection_ids"
        isMulti
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        query={queries.LIST_ALL_COLLECTIONS}
        queryName="allCollections"
        selected={values.collection_ids}
      />
      <InputField
        displayName="Cataloging Notes"
        fieldName="cataloging_notes"
        modelName={model}
      />
      <SelectField
        displayName="Publication Status"
        fieldName="publication_status"
        modelName={model}
        onBlur={selectOnBlur}
        onChange={selectOnChange}
        options={pubStatusOptions}
        selected={values.publication_status}
      />
    </Fragment>
  );
};

export default ResourceForm;
