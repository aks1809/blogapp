const createProxyMiddleware = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/auth/*",
    createProxyMiddleware({
      target: "http://localhost:9000",
      changeOrigin: true,
    })
  );
};
