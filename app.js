const express = require("express");
const cors = require("cors");
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

app.all("*", (req, res) => {
    res.status(404).send({ msg: "route not found" });
});

const { PORT = 9090 } = process.env;

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Listening on ${PORT}...`);
});
