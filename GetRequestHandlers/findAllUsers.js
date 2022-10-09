const { router, app } = require("../config/expressConfig");
const { Credentials } = require("../config/passportMongodb");

// Creating new user, writing into database after validation and checking
app.get("/find_all", (req, res) => {
  // if errors are empty then proceed
  Credentials.find({}, (err, docs) => {
    if (err) {
      // If got error stop the process
      res.status(400).send({ remark: "error", comment: "Request Failed" });
    } else {
      // if docs is null carry on
      if (docs != null) {
        res
          .status(200)
          .json({ remark: "success", comment: "User Found", data: docs });
      } else {
        // stop the process here
        res.status(400).json({ remark: "error", comment: "No users found" });
      }
    }
  });
});

module.exports = {
  findAllUsers: router,
};
