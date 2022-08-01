const express = require("express");
const chrisTins = require("./chrisTin");
const karen = require("./karen");
const karlTatler = require("./karlTatler");
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Were connected!");
});

app.get("/api/christins", chrisTins);
app.get("/api/karen", karen);
app.get("/api/karltatler", karlTatler);

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening on ${PORT}...`);
});
