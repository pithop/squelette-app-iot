import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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

export { database };
