const express = require("express");
const chrisTins = require("./chrisTin");
const karen = require("./karen");
const karlTatler = require("./karlTatler");
const app = express();

app.set("port", process.env.PORT || 3000);

app.get("/api/christins", chrisTins);
app.get("/api/karen", karen);
app.get("/api/karltatler", karlTatler);

app.listen(app.get("port"), () => {
    console.info(`Server listen on port ${app.get("port")}`);
});
