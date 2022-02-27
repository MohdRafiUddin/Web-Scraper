const passport = require('passport')

// Authentication routes for user
module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      accessType: 'offline',
      approvalPrompt: 'force',
    })
  )

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/dashboard')
    }
  )
}
