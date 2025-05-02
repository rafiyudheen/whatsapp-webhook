const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Webhook verification (GET)
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN =
    "EAAPLJEMHWL4BO0jUX5MFE1MUITTwmVVsA7IPSSiHbM2MkXiDu3ZBjig2ZAeDFdD031k34QaDP0rqPdgvTvZBk8PzKeaJOSTZAdLeKssN4klRXfqKujZAypriuJ4Pwh1T3vk3GsyOcOCENzYxwL2bSeZAiiDYgToYVNbavjGpz2LiRwi0bKUcsqxiNAxRwhfZAbEX78wKws0Yjjpm6yG4i7m5Amx2Flr";
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
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
