const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch');

admin.initializeApp();

exports.sendEmailNotification = functions.database.ref('/hackathon/{pushId}')
  .onCreate((snapshot, context) => {
    const value = snapshot.val();
    const url = 'https://squelette-app-1fm6hpf1d-chahraoui-idriss-projects.vercel.app/api/test'; // Remplacez par l'URL de votre application Vercel

    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  });
