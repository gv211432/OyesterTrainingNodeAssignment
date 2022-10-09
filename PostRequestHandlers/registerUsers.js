const { router, check, validationResult } = require("../config/expressConfig");
const { Credentials, UserDetails } = require("../config/passportMongodb");

// validation for email and password
// more strict validation can be add here
let validateCreateReq = [
  check("email", "Email must be in proper format.")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .trim()
    .escape(),
  check("password", "Password must be in proper format.").not().isEmpty(),
];

// Creating new user, writing into database after validation and checking
router.post("/register", validateCreateReq, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ remark: "error", comment: errors });
  }

  // if errors are empty then proceed
  var newEmail = req.body.email;
  var newPassword = req.body.password;

  let data = { ...req.body };

  // Another way of writing into database
  // db.collection('credentials').insertOne(data, function (err, collection) {
  //     if (err)
  //         throw ("Unable to add new clients at this time. Please try again later.");
  //     console.log("Record inserted Successfully");
  // });

  Credentials.findOne({ email: newEmail }, (err, docs) => {
    if (err) {
      // If got error stop the process
      res.status(400).send({ remark: "error", comment: "Request Failed" });
    } else {
      // if docs is null carry on
      if (docs == null) {
        // insert into database
        Credentials.create(data);
        UserDetails.register(
          { username: newEmail, active: false },
          newPassword
        );
        res.status(200).json({ remark: "success", comment: "New user added" });
      } else {
        // stop the process here
        res
          .status(400)
          .json({ remark: "error", comment: "User already exist" });
      }
    }
  });
});

module.exports = {
  registerUsers: router,
};
