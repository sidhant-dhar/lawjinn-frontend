/* eslint-disable react/jsx-props-no-spreading */

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Formik, Field } from 'formik';
import Button from 'react-bootstrap/Button';
import './FormTemplate.scss';
import DndFacts from './dndFacts';
import { get } from '../../utils/Remote';

const FormTemplate = (props) => {
  const { fields, validation, getData, factId } = props;
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    get({ id: factId }, '/additionalfacts').then((res) => {
      const factsWithId = res.data.map((elem, id) => {
        return {
          value: elem,
          id: id.toString(),
        };
      });
      setFacts(factsWithId);
    });
  }, [factId]);

  const changeFacts = (changedFacts) => {
    setFacts(changedFacts);
    console.log(changedFacts);
  };

  const validateDynamic = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    }

    return error;
  };

  const submitData = (values) => {
    const additionalfacts = facts.map((elem, i) => {
      return `${i + 1}. ${elem.value}`;
    });

    values.additionalFacts = additionalfacts;
    getData(values);
  };

  const renderSelect = (input) => {
    return (
      <Fragment key={input.name}>
        <div>
          <Field name={input.name} validate={validateDynamic}>
            {(property) => {
              const { field } = property;
              const { errors, touched } = property.form;
              const hasError =
                errors[input.name] && touched[input.name] ? 'FormTemplate__hasError' : '';

              const defaultOption = (
                <option key='default' value={field.value}>
                  {field.value}
                </option>
              );
              const options = input.data.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ));
              const selectOptions = [defaultOption, ...options];
              return (
                <div className='my-4 FormTemplate__input mx-auto'>
                  <Row>
                    <Col xs={12} md={3} lg={4}>
                      <h6 className='FormTemplate__label'>{input.label}</h6>
                    </Col>
                    <Col xs={12} md={9} lg={8}>
                      <div className='dropdown'>
                        <select
                          value={field.value}
                          {...field}
                          className={`FormTemplate__select ${hasError}`}
                        >
                          {selectOptions}
                        </select>
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            }}
          </Field>
        </div>
      </Fragment>
    );
  };

  // style checkbox and textArea

  const renderCheckBox = (input) => {
    return (
      <Fragment key={input.name}>
        <label htmlFor={input.name}>{input.label}</label>
        <Field name={input.name}>
          {(prop) => {
            const { field } = prop;
            return (
              <input
                id={input.name}
                name={input.name}
                type='checkbox'
                checked={field.value}
                onChange={field.onChange}
              />
            );
          }}
        </Field>
      </Fragment>
    );
  };

  const renderTextArea = (input) => {
    return (
      <Fragment key={input.name}>
        <label htmlFor={input.name}>{input.label}</label>
        <div>
          <Field name={input.name}>
            {(property) => {
              const { field } = property;
              const { errors, touched } = property.form;
              const hasError = errors[input.name] && touched[input.name] ? 'hasError' : '';
              return (
                <div>
                  <textarea {...field} id={hasError} />
                </div>
              );
            }}
          </Field>
        </div>
      </Fragment>
    );
  };

  const getInitialValues = (inputs) => {
    // declare an empty initialValues object
    const initialValues = {};
    // loop loop over fields array
    // if prop does not exit in the initialValues object,
    // pluck off the name and value props and add it to the initialValues object;
    inputs.forEach((field) => {
      if (!initialValues[field.name]) {
        initialValues[field.name] = field.value;
      }
    });

    // return initialValues object
    return initialValues;
  };

  const renderFields = (inputs) => {
    return inputs.map((input) => {
      if (input.type === 'select') return renderSelect(input);
      if (input.type === 'textarea') return renderTextArea(input);
      if (input.type === 'checkbox') return renderCheckBox(input);
      return (
        <div key={input.name}>
          <div className='my-4 FormTemplate__input mx-auto'>
            <Field name={input.name} placeholder={input.placeholder} validate={validateDynamic}>
              {(property) => {
                const { field } = property;
                const { errors, touched } = property.form;
                const hasError =
                  errors[input.name] && touched[input.name] ? 'FormTemplate__hasError' : '';
                return (
                  <Row>
                    <Col xs={12} md={3} lg={4}>
                      <h6 className='FormTemplate__label'>{input.label}</h6>
                    </Col>
                    <Col xs={12} md={9} lg={8}>
                      <label htmlFor={field.name} className='has-float-label my-auto'>
                        <input
                          className={`form-control ${hasError}`}
                          {...field}
                          type='text'
                          placeholder={input.label}
                          id={field.name}
                        />
                        <span>{input.label}</span>
                      </label>
                    </Col>
                  </Row>
                );
              }}
            </Field>
          </div>
        </div>
      );
    });
  };

  const initialValues = getInitialValues(fields);

  return (
    <Formik
      onSubmit={(values) => {
        submitData(values);
      }}
      validationSchema={validation}
      initialValues={initialValues}
    >
      {(form) => {
        const errorMessageShow = Object.keys(form.errors).length > 0;

        return (
          <div>
            <form onSubmit={form.handleSubmit} className='mx-auto text-center mb-4'>
              {renderFields(fields)}
              <DndFacts facts={facts} changeFacts={changeFacts} />
              <Button type='submit' variant='outlinePrimary' className='mt-3'>
                Submit
              </Button>

              {errorMessageShow && (
                <small className='text-danger d-block text-center mt-3'>
                  Please fill the required fields
                </small>
              )}
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default FormTemplate;

FormTemplate.propTypes = {
  validation: PropTypes.instanceOf(Object),
  fields: PropTypes.instanceOf(Array).isRequired,
  getData: PropTypes.func.isRequired,
};

FormTemplate.defaultProps = {
  validation: undefined,
};
