const { router, check, validationResult } = require("../config/expressConfig");
const { Credentials } = require("../config/passportMongodb");

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
router.post("/find_one", validateCreateReq, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ remark: "error", comment: errors });
  }

  // if errors are empty then proceed
  var newEmail = req.body.email;
  var newPassword = req.body.password;

  Credentials.findOne({ email: newEmail }, (err, docs) => {
    if (err) {
      // If got error stop the process
      res.status(400).send({ remark: "error", comment: "Request Failed" });
    } else {
      // if docs is null carry on
      if (docs != null) {
        if (newPassword == docs.password) {
          res
            .status(200)
            .json({ remark: "success", comment: "User Found", data: docs });
        } else {
          res.status(400).json({ remark: "error", comment: "Wrong Password" });
        }
      } else {
        // stop the process here
        res.status(400).json({ remark: "error", comment: "User not found" });
      }
    }
  });
});

module.exports = {
  findOneUser: router,
};
