const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('users')

const Keys = require('../config/keys.js')

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: Keys.GOOGLE_CLIENT_ID,
      clientSecret: Keys.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      scope: Keys.SCOPE,
      proxy: true,
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = profile._json;
      User.findOne({ userId: profile.id }).then((existingUser) => {
        if (existingUser) {
          // Already existing user, don't save in the database.
          done(null, existingUser)
        } else {
          // new user, save user id in the database.
          new User({
            userId: profile.id,
            name: profile.displayName,
            email: userData.email,
            createdOn: new Date(),
            updatedOn: new Date(),
            media_data: {},
            token: {
              accessToken,
              refreshToken,
            },
          })
            .save()
            .then((user) => done(null, user))
        }
      })
    }
  )
)
