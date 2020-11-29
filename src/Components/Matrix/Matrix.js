import React, { useEffect, useState } from 'react';
import download from 'downloadjs';
import Modal from 'react-bootstrap/Modal';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { DynamicForm } from '../DynamicForm/DynamicForm';
import { get, post } from '../../utils/Remote';
import petition2 from '../../assets/images/petition2.jpg';
import './Matrix.scss';

const Matrix = (props) => {
  const {
    history: {
      location: {
        state: { id },
      },
    },
  } = props;

  const [show, setShow] = useState(false);
  const [template, setTemplate] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    get({ id }, '/templatedata').then((res) => {
      const result = res.data[0];
      setTemplate(result);
      console.log(result);
    });
  }, [id]);

  const getFormData = (values) => {
    console.log(values);

    handleShow();

    const payload = {
      title: template.identifier,
      body: values,
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
    <>
      {Object.keys(template).length > 0 && (
        <div>
          <Jumbotron className='Matrix__jumbo'>
            <h1>{template.title}</h1>
          </Jumbotron>

          <h1 className='Matrix__instructions mx-3 my-5'>
            Please fill out the given fields. We shall use this data to draft a beautiful plaint for
            you. All fields are mandatory.
          </h1>

          <Row>
            <Col xs={12} lg={6}>
              <DynamicForm fields={template.keywords} getData={getFormData} factId={template.id} />
            </Col>
            <Col xs={12} lg={6}>
              <img src={template.templateImage} alt='petitionImage' className='img-fluid' />
            </Col>
          </Row>
          <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false} centered>
            <Modal.Header>
              <Modal.Title>LAWJINN</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Ban rha h document. Sabr rakhiye.</p>{' '}
              <p>
                Made with <span style={{ color: '#e25555' }}>❤</span> by LawJinn
              </p>
            </Modal.Body>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Matrix;
