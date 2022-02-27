const express = require("express");
const { ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");

// Loads up the user schema
require("./models/users");
// Loads up the passport google+ auth service
require("./services/passport");

// Fetches the confedentails KEYS based on the environment
// 1. For Local env - Make sure to create your own creds file (config/dev.js)
// 2. For Prod env - The creds have been configured in the heroku app secret variables
const keys = require("./config/keys");

// Establishes the remote MongoDB conection via MongoDB Atlas
mongoose.connect(keys.MONGOOSE_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Starts up the express server
app = express();

// 1. Morgon middleware for debuging and logging
app.use(morgan("tiny"));
// 2. BodyParser middleware will parse incoming request bodies in a middleware before your
// handlers, available under the req.body property
app.use(bodyParser.json({ type: "*/*" }));
// 3. Cookie middleware stores only a session identifier on the client within a cookie and
// stores the session data on the server
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIEKEY],
  })
);
// 4. passport.initialize will initialize the Passport
app.use(passport.initialize());
// 5. passport.session middleware to alter the req object and change the 'user' value that is
// currently the session id (from the client cookie) into the true deserialized user object.
app.use(passport.session());

// 1. Auth Routes - Handles all the authentication related APIs.
require("./routes/authRoutes")(app);
// 2. User Routes - Handles all the users related APIs.
require("./routes/userRoutes")(app);
// 3. Media Scraper - Handles all the media scraper related APIs.
require("./routes/mediaScraperRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets
  app.use(express.static("client/build"));
  // Express will serve up index.html file
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Finding PORT based on env (Development OR Production)
const PORT = process.env.PORT || 5000;
app.listen(PORT);
