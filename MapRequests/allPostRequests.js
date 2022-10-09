const { router } = require("../config/bodyParser");

const { registerUsers } = require("../PostRequestHandlers/registerUsers");
const { deleteUsers } = require("../PostRequestHandlers/deleteUsers");
const { updateUsers } = require("../PostRequestHandlers/updateUsers");
const { findOneUser } = require("../PostRequestHandlers/findOneUser");

router.use(registerUsers);
router.use(deleteUsers);
router.use(updateUsers);
router.use(findOneUser);

module.exports = {
  allPostRequests: router,
};
