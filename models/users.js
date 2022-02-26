const mongoose = require('mongoose')
const { Schema } = mongoose

//Defining Schema of users Model
const userSchema = new Schema({
  userId: String,
  name: String,
  email: String,
  createdOn: Date,
  updatedOn: Date,
  media_data: JSON,
  token: {
    accessToken: String,
    refreshToken: String,
  },
})

mongoose.model('users', userSchema)
