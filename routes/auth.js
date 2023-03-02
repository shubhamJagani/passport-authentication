const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controller/authController");
const { notAuthorize } = require("../middleware/authorize");

router.get("/signup", notAuthorize, authController.getSignUp);
router.post("/signup", notAuthorize, authController.addSignUp);
router.get("/signin", notAuthorize, authController.getsignIn);
router.post(
  "/signin",
  notAuthorize,
  //password auth..
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);
//...
module.exports = router;
