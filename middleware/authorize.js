//passport auth

exports.authorize = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/signin");
};

exports.notAuthorize = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/dashboard");
};
