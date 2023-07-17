const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/exercise.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header({
      "Access-Control-Allow-Headers": "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Origin": "*"
    });
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

  app.get("/api/exercise/get-all", controller.getAllExercises);

  app.post("/api/exercise/update-visibility", controller.updateExercisesVisibility);

};
