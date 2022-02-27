// produnction Keys (Avialable in Heroku Config Variables)
module.exports = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  MONGOOSE_URI: process.env.MONGO_URI,
  COOKIEKEY: process.env.COOKIE_KEY,
  SCOPE: process.env.SCOPES,
  CALLBACK: process.env.CALLBACK,
};
