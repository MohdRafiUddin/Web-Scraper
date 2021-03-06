// Mongoose functions to perform CRUDS on MongoDB
const mongoose = require("mongoose");
// Cheerio to parse and find images, videos source URLs
const cheerio = require("cheerio");
// The User schema
const User = mongoose.model("users");
// Native request library
const request = require("request");
// Authentication Middleware
const requireLogin = require("../middlewares/requireLogin");

/**
 * This method is resposible for sanitizing the img source URL and returns
 * the object containing image source and alt-name.
 *
 * Output:
 *  {
 *    src: 'https://dev.image.com/node.png',
 *    text: The Node Image OR node
 *  }
 *
 * @param {string} imgURL - The image source URL
 * @param {string} imgAlt  - The image alt attribute
 * @returns
 */
const sanitizeImgURL = (imgURL, imgAlt) => {
  if (imgURL === null || imgURL === undefined || imgURL === "") {
    return null;
  }
  return {
    src: imgURL.split(/[?#]/)[0],
    text: imgAlt || imgURL.match(/[\w-]+\.(jpg|png|txt|svg)/g),
  };
};

/**
 * This method is responsible for fetching raw html from the specified website URL
 * and parse/handles the response data
 * @param {function} res
 * @param {User} existingUser
 * @param {string} websiteURL
 */
const fetchMediaData = (res, existingUser, websiteURL) => {
  const siteURL = new URL(websiteURL);
  request(websiteURL, (error, response, html) => {
    if (error || response.statusCode !== 200) {
      res.send(error);
    } else {
      const responseData = responseHandler(html, siteURL);
      const isValidateData = isValidateResponseData(responseData);
      if (isValidateData) {
        updateSucessUserData(res, existingUser, responseData);
      } else {
        updateFailureUserData(res, existingUser, {});
        res.status(404).send("Not found");
      }
    }
  });
};

/**
 * This method is responsible for validating the response data returns boolean
 * @param {object} responseData
 * @returns
 */
const isValidateResponseData = (responseData) => {
  if (responseData === null || responseData === undefined) {
    return false;
  }
  const isImagesAvialable =
    responseData.imagesURLs !== null &&
    responseData.imagesURLs !== undefined &&
    responseData.imagesURLs.length > 0;
  if (isImagesAvialable) {
    return true;
  }
  return false;
};

/**
 * This method is responsible for handling the response data
 * @param {string} html
 * @param {string} siteURL
 * @returns
 */
const responseHandler = (html, siteURL) => {
  const $ = cheerio.load(html);
  const responseData = {
    imagesURLs: [],
  };
  $("img").each((index, image) => {
    const imgSource = $(image).attr("src");
    const imgAlt = $(image).attr("alt");
    if (imgSource !== null && imgSource !== undefined) {
      if (imgSource.startsWith(siteURL.protocol)) {
        responseData.imagesURLs.push(sanitizeImgURL(imgSource, imgAlt));
      } else {
        if (imgSource.startsWith("//")) {
          responseData.imagesURLs.push(
            sanitizeImgURL(`${siteURL.origin}${imgSource.substring(1)}`, imgAlt)
          );
        } else {
          responseData.imagesURLs.push(
            sanitizeImgURL(`${siteURL.origin}${imgSource}`, imgAlt)
          );
        }
      }
    }
  });
  return responseData;
};

/**
 * This method is responsible for updating the user data
 * @param {object} res
 * @param {User} existingUser
 * @param {object} responseData
 */
const updateSucessUserData = (res, existingUser, responseData) => {
  User.findOneAndUpdate(
    { userId: existingUser.userId },
    {
      updatedOn: new Date(),
      media_data: JSON.stringify(responseData),
    },
    { upsert: true },
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    }
  );
};

/**
 * This method is responsible for updating the user data
 * @param {object} res
 * @param {User} existingUser
 * @param {object} responseData
 */
const updateFailureUserData = (res, existingUser, responseData) => {
  User.findOneAndUpdate(
    { userId: existingUser.userId },
    {
      updatedOn: new Date(),
      media_data: JSON.stringify(responseData),
    },
    { upsert: true },
    (err) => {
      if (err) res.send(err);
    }
  );
};

/**
 * This method is responsible for scraping requested web media (Images, Videos) URLs and
 * store the response data in the database for the given userId and webBaseURL.
 * @param {function} app
 */
module.exports = (app) => {
  app.post("/api/v1/media-scraper", requireLogin, (req, res) => {
    // Finding the User model by user userId and then fetching the accessToken from db
    User.findOne({ userId: req.body.userId }).then((existingUser) => {
      if (
        req.body === null ||
        req.body.websiteURLs === null ||
        req.body.websiteURLs.length === 0
      ) {
        throw new Error("Invalid input data provided");
      }
      req.body.websiteURLs.forEach((websiteURL) => {
        fetchMediaData(res, existingUser, websiteURL);
      });
    });
  });
};
