import Papa from 'papaparse';
import { ref, set } from 'firebase/database';
import { database } from './firebase';

export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      complete: (results) => {
        resolve(results.data);
      },
      header: true,
      skipEmptyLines: true,
    });
  });
};

export const uploadCSVToFirebase = async (file, path) => {
  const data = await parseCSV(file);
  const dbRef = ref(database, path);
  set(dbRef, data);
};
