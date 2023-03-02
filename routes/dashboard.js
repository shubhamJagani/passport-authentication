const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");
const { authorize } = require("../middleware/authorize");

router.get("/dashboard", authorize, dashboardController.dashboard);
router.get("/logout", authorize, dashboardController.logout);

module.exports = router;
