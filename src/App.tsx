import React, { useState } from "react";
import "./App.css";
import { uploadCSVToFirebase } from './utils';
import { DisplayData } from './DisplayData';

export default function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (file) {
      uploadCSVToFirebase(file, 'sable-limoneux/soil-humidity');
    }
  };

  return (
    <div className="App">
      <header>
        <img src="logo512.png" alt="Project Logo" className="logo" />
        <h1>Bienvenue sur votre application</h1>
      </header>
      <main>
        <section>
          <h2>Télécharger les données</h2>
          <input type="file" onChange={handleFileUpload} />
          <button onClick={handleUpload}>Uploader</button>
        </section>
        <DisplayData path="sable-limoneux/soil-humidity" />
      </main>
      <footer>
        <p>&copy; 2024 Votre Compagnie. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
