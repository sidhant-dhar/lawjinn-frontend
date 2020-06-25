import React from 'react';
import Container from 'react-bootstrap/Container';
import logo from './logo.svg';
import './App.scss';

function App() {
  return (
    <Container fluid className="p-0 m-0 overflow-hidden">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          <code>src/App.js</code>
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          Learn React YO
        </a>
      </header>
    </Container>
  );
}

export default App;
