const dotenv = require("dotenv");
dotenv.config();

const { app, _port } = require("./config/expressConfig");

const { allPostRequests } = require("./MapRequests/allPostRequests");
const { allGetRequests } = require("./MapRequests/allGetRequests");

// include all get request and post request routes
app.use(allGetRequests);
app.use(allPostRequests);

// start listning on the given port
app.listen(_port, () => {
  console.log("Server started on port " + _port);
  console.log("http://localhost:" + _port);
});
