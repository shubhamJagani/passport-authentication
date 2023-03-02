const express = require("express");
const router = express.Router();
const auth = require("./auth");
const dashboard = require("./dashboard");

router.use("/", auth);
router.use("/", dashboard);

module.exports = router;
