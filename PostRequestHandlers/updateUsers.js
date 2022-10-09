const { router, check, validationResult } = require("../config/expressConfig");
const { Credentials, UserDetails } = require("../config/passportMongodb");

// validation for email and password
// more strict validation can be add here

let validateUpdateReq = [
  check("email", "Email must be in proper format.")
    .not()
    .isEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .trim()
    .escape(),
  check("password", "Password must be in proper format.").not().isEmpty(),
];

// Creating the user, writing into database after validation and checking
router.put("/update", validateUpdateReq, (req, res) => {
  console.log("/update called");
  const errors = validationResult(req);

  // if errors are empty then proceed
  if (!errors.isEmpty()) {
    return res.status(400).json({ remark: "error", comment: errors });
  }

  // pullign out the required main data for initial validation
  let { email, password, newEmail, newPassword, ...restData } = req.body;

  // console.log(email, password, newEmail, newPassword, restData);

  Credentials.findOne({ email: email }, (err, docs) => {
    if (err) {
      // If got error stop the process
      res.status(400).send({ remark: "error", comment: "Request Failed" });
    } else {
      // if docs is null carry on
      if (docs != null) {
        if (password == docs.password) {
          let data = { email: email, password: password };

          if (newEmail != undefined) data.email = newEmail;
          if (newPassword != undefined) data.password = newPassword;

          data = { ...data, ...restData };
          data.updatedON = new Date();

          Credentials.updateOne({ email: email }, data)
            .then(() => {
              if (newEmail != undefined || newPassword != undefined) {
                UserDetails.deleteOne({ email: email })
                  .then(() => {
                    UserDetails.register(
                      { username: data.email, active: false },
                      data.password
                    ).then(() => {
                      // delete and add new details
                      console.log("user details updated");
                    });
                  })
                  .catch(() => {
                    res
                      .status(400)
                      .json({ remark: "error", comment: "Unknown Error" });
                  });
              }
              res
                .status(200)
                .json({ remark: "success", comment: "User Updated" });
            })
            .catch(() => {
              res
                .status(400)
                .json({ remark: "error", comment: "Unable to update" });
            });
        } else {
          res.status(400).json({ remark: "error", comment: "Wrong password" });
        }
      } else {
        // stop the process here
        res
          .status(400)
          .json({ remark: "error", comment: "User dosen't exist" });
      }
    }
  });
});

module.exports = {
  updateUsers: router,
};
