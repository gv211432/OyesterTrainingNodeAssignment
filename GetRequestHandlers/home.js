const { router, app, _frontend } = require("../config/expressConfig");

app.get("/", (req, res) => {
  // res.set({
  //   "Access-control-Allow-Origin": "*",
  // });
  res.sendFile(_frontend + "/index.html");
});

module.exports = {
  homePage: router,
};
