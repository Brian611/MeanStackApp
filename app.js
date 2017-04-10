const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const config = require("./config/database");
const cors = require("cors");

// Create the database connection 
mongoose.connect(config.database);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on("connected", () => {
  console.log('Mongoose default connection open to ' + config.database);
});

// If the connection throws an error
mongoose.connection.on("error", (err) => {
  console.log("Mongoose default connection error: " + err);
});

// When the connection is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection 
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose default connection disconnected through app termination");
    process.exit(0);
  });
});

const api = require("./routes/api");
const user = require("./routes/user");

const app = express();
const port = process.env.PORT | 3000;

app.use(cors());
app.use(express.static(path.resolve(__dirname, "public")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/passport')(passport); // pass passport for configuration

app.use("/api", api);
app.use("/api", user);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.render('404');
});

app.listen(port, (req, res) => {
  console.log('Server running on localhost:/' + port);
}); 