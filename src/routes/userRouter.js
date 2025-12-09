const express = require("express");

const app = express.Router();

app.get("/ping", (req, res) => {
    res.json({ message: "pong!" });
});

module.exports = app;