const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chahidriss01@gmail.com', // Remplacez par votre email
    pass: 'uxmd zpjr vcjk cvrk' // Remplacez par le mot de passe de votre application
  }
});

module.exports = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const value = req.body.value;
  const mailOptions = {
    from: 'chahidriss01@gmail.com',
    to: 'chahraouiidriss@gmail.com', // Remplacez par l'e-mail du destinataire
    subject: 'New Value Added',
    text: `A new value has been added: ${value}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent');
  });
};
