const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./routes/api");

const port = process.env.PORT | 3000;

const app = express();

app.use("api", api);

app.get('*', (req, res) => {
    res.send("404");
});

app.listen(port, "localhost", (req, res) => {
    console.log('Server running on localhost:/' + port);
}); 