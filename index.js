const express = require("express");
const db = require("./config/moongose");
const app = express();
const bodyParser = require("body-parser");
const port = 8000;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("error in connection the server", err);
    return;
  }
  console.log("server is running on a port 8000");
});
