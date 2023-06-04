const { authJwt } = require("../middlewares");
const controller = require("../controllers/exercise.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/exercise/create",
    controller.create
  );

  app.post(
    "/api/exercise/resolve",
    controller.resolve
  );
};
