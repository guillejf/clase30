import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();
/* console.log({
  user: process.env.GOOGLE_EMAIL,
  pass: process.env.GOOGLE_PASS,
}); */

////////////////////////////////////////////////////////
//--------------------NODEMAILER------------------------
////////////////////////////////////////////////////////
import nodemailer from "nodemailer";
import __dirname from "./utils.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

app.get("/mail", async (req, res) => {
  const result = await transport.sendMail({
    from: process.env.GOOGLE_EMAIL,
    to: "francoivangalluccio@gmail.com, medina.juaan@gmail.com, fersimizu@gmail.com, joaquin.perez.coria@gmail.com, pgaman58@gmail.com",
    subject: "Test camada 51395",
    html: `
              <div>
                  <h1>La mejor camada 51395!</h1>
                  <p>pero un poco silenciosa.... hay que hablar un poco mas!!!!</p>
                  <img src="cid:image1" />
              </div>
          `,
    attachments: [
      {
        filename: "image1.gif",
        path: __dirname + "/images/image1.gif",
        cid: "image1",
      },
    ],
  });

  console.log(result);
  res.send("Email sent");
});

////////////////////////////////////////////////////////
//--------------------TWILIO----------------------------
////////////////////////////////////////////////////////
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

app.get("/sms", async (req, res) => {
  const result = await client.messages.create({
    body: "que onda che",
    from: process.env.TWILIO_PHONE_NUMBER,
    to: "+59897076870",
  });

  console.log(result);

  res.send("SMS sent");
});

app.listen(8080, () => console.log("http://localhost:8080"));
