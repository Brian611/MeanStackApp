const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");

const api = require("./routes/api");
const app = express();
const port = process.env.PORT | 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, (req, res) => {
    console.log('Server running on localhost:/' + port);
}); 