import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import "./App.css";
import DisplayData from './DisplayData';
import GlobalCharts from './GlobalCharts';
import { Modal, Button } from 'react-bootstrap';

export default function App() {
  const [showGlobalModal, setShowGlobalModal] = useState(false);

  return (
    <div className="App">
      <header>
        <img src="logo512.png" alt="Project Logo" className="logo" />
        <h1>Bienvenue sur votre application</h1>
      </header>
      <main>
        <DisplayData path="hackathon" />
        <Button variant="primary" onClick={() => setShowGlobalModal(true)}>
          Afficher les graphiques globaux
        </Button>
        <Modal show={showGlobalModal} onHide={() => setShowGlobalModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Graphiques Globaux</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <GlobalCharts />
          </Modal.Body>
        </Modal>
      </main>
    </div>
  );
}
