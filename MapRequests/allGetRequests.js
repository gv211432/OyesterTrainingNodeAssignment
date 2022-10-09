const { router } = require("../config/expressConfig");

const { homePage } = require("../GetRequestHandlers/home");
const { findAllUsers } = require("../GetRequestHandlers/findAllUsers");
const { sign_up } = require("../GetRequestHandlers/sign_up");
const { unregisterPage } = require("../GetRequestHandlers/delete");

router.use(findAllUsers);
router.use(homePage);
router.use(sign_up);
router.use(unregisterPage);

module.exports = {
  allGetRequests: router,
};
