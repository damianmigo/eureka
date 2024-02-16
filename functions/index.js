/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const express = require("express");
const engines = require("consolidate");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const app = express();
app.engine("hbs", engines.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

app.get("/", (request, response) => {
  response.set("Cache-Control", "public, max-age=300, s-maxage=600");
  response.render("index", {
    title: "Hello world",
  });
});

app.get("/timestamp", (request, response) => {
  response.send(`${Date.now()}`);
});

app.get("/timestamp-cached", (request, response) => {
  response.set("Cache-Control", "public, max-age=300, s-maxage=600");
  response.send(`${Date.now()}`);
});

exports.app = onRequest(app);
