const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Webhook verification (GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my-webhook";
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receive messages (POST)
app.post("/webhook", (req, res) => {
  // console.log(req.body.entry[0].changes[0].value.contacts[0].profile.name);
  // console.log(req.body.entry[0].changes[0].value.messages[0].from);
  // console.log(req.body.entry[0].changes[0].value.messages[0].timestamp);
  // console.log(req.body.entry[0].changes[0].value.messages[0].text.body);
  // console.log(req.body.entry[0].changes[0].value.messages[0].type);
  const contactName =
    req.body.entry[0].changes[0].value.contacts[0].profile.name;
  const senderId = req.body.entry[0].changes[0].value.messages[0].from;
  const timestamp = req.body.entry[0].changes[0].value.messages[0].timestamp;
  const messageBody = req.body.entry[0].changes[0].value.messages[0].text.body;
  const messageType = req.body.entry[0].changes[0].value.messages[0].type;

  console.log(`Received message:
  - Contact Name: ${contactName}
  - Sender ID: ${senderId}
  - Timestamp: ${timestamp}
  - Message Body: ${messageBody}
  - Message Type: ${messageType}`);

  // console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
