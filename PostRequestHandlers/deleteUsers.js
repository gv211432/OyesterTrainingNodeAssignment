const { router, check, validationResult } = require("../config/expressConfig");
const { Credentials, UserDetails } = require("../config/passportMongodb");

// validation for email and password
// more strict validation can be add here
let validateDeleteReq = [
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
router.delete("/unregister", validateDeleteReq, (req, res) => {
  res.set({
    "Access-control-Allow-Origin": "*",
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).send({ remark: "error", comment: errors });
  }
  // if errors are empty then proceed

  let newEmail = req.body.email;
  let newPassword = req.body.password;

  Credentials.findOne({ email: newEmail }, (err, docs) => {
    if (err) {
      // If got error stop the process
      res.status(400).send({ remark: "error", comment: "Request Failed" });
    } else {
      // if docs is null carry on
      if (docs != null) {
        console.log(docs);
        if (newPassword == docs.password) {
          Credentials.deleteOne({ email: newEmail })
            .then(() => {
              UserDetails.deleteOne({ username: newEmail })
                .then(() => {
                  res
                    .status(200)
                    .json({ remark: "success", comment: "User deleted" });
                })
                .catch(() => {
                  res
                    .status(400)
                    .json({ remark: "error", comment: "Unknown error" });
                });
            })
            .catch(() => {
              res
                .status(400)
                .json({ remark: "error", comment: "User not deleted" });
            });
        } else {
          res.status(400).json({ remark: "error", comment: "Wrong Password" });
        }
      } else {
        // stop the process here
        res.status(400).json({ remark: "error", comment: "User don't exist" });
      }
    }
  });
});

module.exports = {
  deleteUsers: router,
};
