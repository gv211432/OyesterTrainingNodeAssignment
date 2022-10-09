const { app } = require("./expressConfig");

const _db_name = process.env.DB_NAME;
const _mongodb_port = process.env.MONGODB_PORT;

/*  PASSPORT SETUP  */
// importing the passport plugin
const passport = require("passport");

// passport middlewar setup
app.use(passport.initialize());
app.use(passport.session());

/* MONGOOSE SETUP */
// importing the plugin
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// Connecting to database
mongoose.connect("mongodb://localhost:" + _mongodb_port + "/" + _db_name).then(
  () => {
    console.log("Connected to MongoDB!!");
  },
  () => {
    console.log("Unable to connect to MongoDB...");
  }
);

// Creating new constructur for schema
const Schema = mongoose.Schema;

// Schema for our main database named credentials
const Credential = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdON: { type: Date, default: Date.now() },
  updatedON: { type: Date, default: Date.now() },
  active: { type: Boolean, default: false },
  remember: { type: String, default: "off" },
});

// this is a model
const Credentials = mongoose.model("credentials", Credential, "credentials");

// schema for authentication purpose
const UserDetail = new Schema({
  username: String, //email
  password: String,
});

// importing local mongoose passport plugin
// it is just befor the schema used for authentication
UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model("userInfo", UserDetail, "userInfo");

/* PASSPORT LOCAL AUTHENTICATION */
// using inbuilt stratergy of passport module
passport.use(UserDetails.createStrategy());

// making passport applicable for userdetails schema
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

module.exports = {
  Credentials,
  UserDetails,
  _db_name,
  _mongodb_port,
};
