const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

let lastRequestTime = 0; // Almacena el tiempo de la última solicitud
const delay = 20000; // 20 segundos

function sendEmail({ email, subject, message }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "cuidatestapp@gmail.com",
        pass: "hsyr setf smwk actd",
      },
    });

    const mail_configs = {
      from: "cuidatestapp@gmail.com",
      to: email,
      subject: subject,
      html: `
      <p>${message}</p>
      `,
    };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occurred` });
      }
      return resolve({ message: "Email sent successfully" });
    });
  }); 
}

app.get("/", (req, res) => {
  const currentTime = Date.now();

  if (currentTime - lastRequestTime < delay) {
    return res.status(429).send("Please wait 20 seconds before sending another email.");
  }

  lastRequestTime = currentTime;

  sendEmail(req.query)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`nodemailerProject is listening at http://localhost:${port}`);
});