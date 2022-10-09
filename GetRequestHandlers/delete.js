const { router, app } = require("../config/expressConfig");
const { _frontend } = require("../config/expressConfig");

app.get("/unregister", (req, res) => {
  // res.set({
  //   "Access-control-Allow-Origin": "*",
  // });
  res.sendFile(_frontend + "/delete.html");
});

module.exports = {
  unregisterPage: router,
};
