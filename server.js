const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackathonlpsndoc-default-rtdb.europe-west1.firebasedatabase.app"
});

const db = admin.database();
const app = express();

app.use(bodyParser.json());

app.post('/addData', (req, res) => {
  const { path, data } = req.body;
  db.ref(path).set(data)
    .then(() => res.status(200).send('Data inserted successfully'))
    .catch(error => res.status(500).send(error));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
