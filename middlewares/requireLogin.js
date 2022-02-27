// Middleware for checking whether user is login or not
module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ error: "User not found. You must login in!" });
  }
  next();
};
