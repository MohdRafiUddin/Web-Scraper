const mongoose = require("mongoose");
const cheerio = require("cheerio");
const User = mongoose.model("users");
const axios = require("axios");
const request = require("request");
const requireLogin = require("../middlewares/requireLogin");

const Keys = require("../config/keys.js");

// TESTING
const vgmUrl = "https://www.vgmusic.com/music/console/nintendo/nes";

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
        const siteURL = new URL(websiteURL);
        request(websiteURL, (error, response, html) => {
          if (error || response.statusCode !== 200) {
            next(error);
          }
          const $ = cheerio.load(html);
          const responseData = {
            imagesURLs: [],
            videoURLs: [],
          };
          $("img").each((index, image) => {
            const imgSource = $(image).attr("src");
            if (imgSource !== null && imgSource !== undefined) {
              if (imgSource.startsWith(siteURL.protocol)) {
                responseData.imagesURLs.push(imgSource);
              } else {
                responseData.imagesURLs.push(`${siteURL.origin}${imgSource}`);
              }
            }
          });
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
          )
        });
      });
    });
  });
};
