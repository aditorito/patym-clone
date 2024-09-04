const { Router } = require('express');
const router = Router();
const UserRouter = require("./user");
const AccountRouter = require("./account");

router.use("/user", UserRouter);
router.use("/account", AccountRouter);

module.exports = router;