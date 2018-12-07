const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.get("/outlook", (req, res) => {
  console.log("Starting outlook job");
  console.log("--------------------------");
  console.log("Ending outlook job");
  console.log("--------------------------");
  res.end("foo");
});

module.exports = app;
