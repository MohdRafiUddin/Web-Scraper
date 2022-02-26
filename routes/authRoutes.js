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

  app.get('/api/v1/current_user', (req, res) => {
    if (req.user) {
      res.send({
        userId: req.user.userId,
        email: req.user.email,
        name: req.user.name,
        createdOn: req.user.createdOn,
        updatedOn: req.user.createdOn,
      })
    } else {
      res.send(req.user)
    }
  })

  /**
   * This API is responsible for return user data from the database
   */
  app.get('/api/v1/current_user/data', (req, res) => {
    if (req.user && req.user.media_data) {
      if (typeof req.user.media_data === 'string') {
        res.send({
          data: JSON.parse(req.user.media_data),
        })
      } else {
        res.send({
          data: req.user.media_data,
        })
      }
    } else {
      res.send(req.user)
    }
  })

  app.get('/api/v1/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  })
}
