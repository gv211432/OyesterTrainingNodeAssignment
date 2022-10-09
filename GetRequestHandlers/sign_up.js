const { router } = require("../config/expressConfig");
const { _frontend } = require("../config/expressConfig");

router.get("/sign_up", (req, res) => {
  // res.set({
  //   "Access-control-Allow-Origin": "*",
  // });
  res.sendFile(_frontend + "/signup.html");
});

module.exports = {
  sign_up: router,
};
