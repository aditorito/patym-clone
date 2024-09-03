const { Router } = require('express');
const router = Router();
const UserRouter = require("./user");

router.use("/user", UserRouter);

module.exports = router;