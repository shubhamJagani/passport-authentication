exports.dashboard = async (req, res) => {
  try {
    console.log(req.session);
    res.render("dashboard");
  } catch (error) {
    console.log(error);
  }
};
exports.logout = async (req, res) => {
  try {
    req.session.destroy();

    res.redirect("/signin");
  } catch (error) {
    console.log(error);
  }
};
