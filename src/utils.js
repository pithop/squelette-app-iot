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

const sanitizeKey = (key) => {
  return key.replace(/[.#$/\[\]]/g, '_');
};

const sanitizeData = (data) => {
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  } else if (data !== null && typeof data === 'object') {
    return Object.keys(data).reduce((acc, key) => {
      const sanitizedKey = sanitizeKey(key);
      acc[sanitizedKey] = sanitizeData(data[key]);
      return acc;
    }, {});
  }
  return data;
};

export const uploadCSVToFirebase = async (file, path) => {
  const data = await parseCSV(file);
  const sanitizedData = sanitizeData(data);
  const dbRef = ref(database, path);
  set(dbRef, sanitizedData);
};
