const User = require("../models/userModel");

exports.getSignUp = async (req, res, next) => {
  try {
    res.render("signUp");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addSignUp = async (req, res, next) => {
  try {
    const { userName, birthDate, email, password } = req.body;

    const user = {
      userName,
      birthDate,
      email,
      password,
    };

    await User.create(user);

    req.flash("success", "User Register successfully..!");

    res.redirect("/signIn");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getsignIn = async (req, res, next) => {
  try {
    const user = await User.find();

    const success = req.flash("success");
    const error = req.flash("error");

    res.render("signIn", { user, success, error });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addsignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.redirect("/signUp");
    }

    if (findUser.password !== password) {
      return res.redirect("/signIn");
    }

    req.session.userId = findUser.id;

    return res.redirect("/dashboard");
  } catch (error) {
    const status = error.statusCode || 500;
    return res.status(status).json({
      success: false,
      message: error.message,
    });
  }
};
