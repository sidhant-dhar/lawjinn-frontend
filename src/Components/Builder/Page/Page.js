import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import download from 'downloadjs';
import Modal from 'react-bootstrap/Modal';
import { get, post } from '../../../utils/Remote';

const Page = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const testWordDoc = (elem) => {
    handleShow();

    const payload = {
      title: 'divorceHindu',
      body: elem,
    };

    console.log(payload);

    post(payload, '/createdoc')
      .then((res) => {
        console.log(res);
        get(res, '/getFile')
          .then((response) => {
            console.log(response);
            setTimeout(() => {
              download(response.url);
              handleClose();
            }, 2000);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Formik
        initialValues={{
          petitioner_name: '',
          respondent_name: '',
          name_of_firm: '',
          address_of_office: '',
          advocates_contact: '',
          place: '',
          current_address: '',
          last_resided: '',
        }}
        validationSchema={Yup.object().shape({
          petitioner_name: Yup.string().required("Petitioner's Name is required"),
          respondent_name: Yup.string().required("Respondent's Name is required"),
          name_of_firm: Yup.string().required('Name of firm is required'),
          address_of_office: Yup.string().required('address is required'),
          advocates_contact: Yup.string().required('Contact is required'),
          place: Yup.string().required('Place is required'),
          current_address: Yup.string().required('current address of petitioner is required'),
          last_resided: Yup.string().required('last residence of petitioner is required'),
        })}
        onSubmit={(fields) => testWordDoc(fields)}
        render={({ errors, status, touched }) => (
          <Form>
            <div className='form-group'>
              <label htmlFor='petitioner_name'>Petitioner's Name</label>
              <Field
                name='petitioner_name'
                type='text'
                className={`form-control${
                  errors.petitioner_name && touched.petitioner_name ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name='petitioner_name' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <label htmlFor='respondent_name'>Respondent's Name</label>
              <Field
                name='respondent_name'
                type='text'
                className={`form-control${
                  errors.respondent_name && touched.respondent_name ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name='respondent_name' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <label htmlFor='name_of_firm'>Name of Firm</label>
              <Field
                name='name_of_firm'
                type='text'
                className={`form-control${
                  errors.name_of_firm && touched.name_of_firm ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name='name_of_firm' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <label htmlFor='address_of_office'>Address of Advocate&apos;s Office</label>
              <Field
                name='address_of_office'
                type='text'
                className={`form-control${
                  errors.address_of_office && touched.address_of_office ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name='address_of_office' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <label htmlFor='advocates_contact'>Contact of Advocate</label>
              <Field
                name='advocates_contact'
                type='text'
                className={`form-control${
                  errors.advocates_contact && touched.advocates_contact ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name='advocates_contact' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <label htmlFor='place'>Place</label>
              <Field
                name='place'
                type='text'
                className={`form-control${errors.place && touched.place ? ' is-invalid' : ''}`}
              />
              <ErrorMessage name='place' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <label htmlFor='current_address'>Current Address</label>
              <Field
                name='current_address'
                type='text'
                className={`form-control${
                  errors.current_address && touched.current_address ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name='current_address' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <label htmlFor='last_resided'>Where was the Petitioner last residing?</label>
              <Field
                name='last_resided'
                type='text'
                className={`form-control${
                  errors.last_resided && touched.last_resided ? ' is-invalid' : ''
                }`}
              />
              <ErrorMessage name='last_resided' component='div' className='invalid-feedback' />
            </div>
            <div className='form-group'>
              <button type='submit' className='btn btn-primary mr-2'>
                Register
              </button>
              <button type='reset' className='btn btn-secondary'>
                Reset
              </button>
            </div>
          </Form>
        )}
      />

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>LAWJINN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ban rha h document. Sabr rakhiye.</p>{' '}
          <p>
            Made with <span style={{ color: '#e25555' }}>❤</span> by LawDay
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Page;
