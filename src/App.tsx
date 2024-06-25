import React, { useEffect, useState } from "react";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCAtui-PZxdfmbrcQV4NLNci0pgf4iyO28",
  authDomain: "hackathonlpsndoc.firebaseapp.com",
  projectId: "hackathonlpsndoc",
  storageBucket: "hackathonlpsndoc.appspot.com",
  messagingSenderId: "311547897393",
  appId: "1:311547897393:web:30ce2f3b00e14aab1bd710",
  measurementId: "G-G9MBS8TS3V",
  databaseURL: "https://hackathonlpsndoc-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const dataRef = ref(database, 'test/path'); // Utilisez le chemin correct ici
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, []);

  return (
    <div className="App">
      <h1>Bienvenue sur votre application</h1>
      <p>{data ? JSON.stringify(data) : "Chargement..."}</p>
    </div>
  );
}
