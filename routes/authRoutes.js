// Passport for Google OAuth2.0
const passport = require("passport");

// Authentication routes for user
module.exports = (app) => {
  /**
   * This API get invoke during OAuth2.0 authentication
   */
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      accessType: "offline",
      approvalPrompt: "force",
    })
  );

  /**
   * This API get invoke during OAuth2.0 authentication callback. The
   * User will get redirected to Dashboard after sucessfull authentication
   */
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/dashboard");
    }
  );
};
