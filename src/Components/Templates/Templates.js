import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { get } from '../../utils/Remote';
import petition1 from '../../assets/images/Petition.jpg';

const Templates = (props) => {
  const { history } = props;

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    get('', '/templates').then((res) => {
      const result = res.map((elem) => {
        elem.templateImage = petition1;
        return elem;
      });

      setTemplates(result);
    });
  }, []);

  const goToBuilder = (elem) => {
    if (elem.isMatrix) {
      history.push({
        pathname: '/matrix',
        state: { id: elem.id },
      });
    } else {
      history.push('/builder');
    }
  };

  return (
    <Row>
      {templates.map((elem) => {
        return (
          <Col className='m-3' xs={12} md={4} key={elem.id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant='top' src={elem.templateImage} />
              <Card.Body>
                <Card.Title>{elem.title}</Card.Title>
                <Card.Text>{elem.body}</Card.Text>
                <Button variant='primary' onClick={() => goToBuilder(elem)}>
                  Chale?
                </Button>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default Templates;
