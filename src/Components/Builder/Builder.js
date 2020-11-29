import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DataEntry from './DataEntry/DataEntry';
import Page from './Page/Page';

const Builder = () => {
  return (
    <>
      <h1 className='text-center m-3'>LAWJINN - Divorce</h1>
      <Row className='m-2'>
        <Col xs={12} md={4} className='p-2'>
          <Page />
        </Col>

        <Col xs={12} md={8}>
          <DataEntry />
        </Col>
      </Row>
    </>
  );
};

export default Builder;
