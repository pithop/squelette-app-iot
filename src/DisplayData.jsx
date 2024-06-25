import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from './firebase';

export const DisplayData = ({ path }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataRef = ref(database, path);
    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      setData(data);
    });
  }, [path]);

  return (
    <div>
      <h2>Données</h2>
      <table>
        <thead>
          <tr>
            {data.length > 0 && Object.keys(data[0]).map(key => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
