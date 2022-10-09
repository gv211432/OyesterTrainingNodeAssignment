const { express, app, router, secretSession } = require("./expressConfig");

const bodyParser = require("body-parser");

// importing session
const expressSession = require("express-session")({
  secret: secretSession,
  resave: false,
  saveUninitialized: false,
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
});

// bodyparser and session middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

module.exports = {
  app,
  express,
  router,
};
