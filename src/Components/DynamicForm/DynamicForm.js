import React from 'react';
import PropTypes from 'prop-types';
import { validation } from './Validation';
import FormTemplate from './FormTemplate';

export const DynamicForm = (props) => {
  const { getData, fields, factId } = props;

  const getDynamicData = (e) => {
    getData(e);
  };

  return (
    <FormTemplate
      fields={fields}
      validation={validation}
      getData={getDynamicData}
      factId={factId}
    />
  );
};

DynamicForm.propTypes = {
  getData: PropTypes.func.isRequired,
  fields: PropTypes.instanceOf(Array).isRequired,
  factId: PropTypes.string.isRequired,
};
