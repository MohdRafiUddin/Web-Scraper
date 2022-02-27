const mongoose = require("mongoose");
const { Schema } = mongoose;

// Defining Schema of users Model
const userSchema = new Schema({
  userId: String,           // Primary Key
  name: String,             // User name
  email: String,            // User Gmail address
  createdOn: Date,          // User created date
  updatedOn: Date,          // User upadted date
  media_data: JSON,         // User media like images URLs, videos URLs etc
  token: {                  // TODO: User google creds to store scraper media in Google Drive
    accessToken: String, 
    refreshToken: String,
  },
});

mongoose.model("users", userSchema);
