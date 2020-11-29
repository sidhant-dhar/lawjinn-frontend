import React from 'react';
import Container from 'react-bootstrap/Container';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from './Routing';
import './App.scss';

function App() {
  return (
    <Container fluid className='p-0 m-0 overflow-hidden'>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Container>
  );
}

export default App;
