const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * For higher version of react, this is how we have to apply proxy
 * for development enviroment
 * @param {*} app 
 */
module.exports = (app) => {
  app.use(
    ["/api/*", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
