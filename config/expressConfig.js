const express = require("express");
const app = express();
const router = express.Router();

const secretSession = process.env.SECRET_SESSION;

const _frontend = process.env.FRONT_DIR;
const _port = process.env.HTTP_PORT;

// This is useful for cross origin resources sharing
const cors = require("cors");

// This is useful for validating and checking the data given in request body
// before submitting to database..
const { check, body, validationResult } = require("express-validator");

module.exports = {
  express,
  app,
  router,
  secretSession,
  _frontend,
  _port,
  cors,
  check,
  body,
  validationResult,
};
