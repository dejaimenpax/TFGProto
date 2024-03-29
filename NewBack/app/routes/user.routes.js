const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
app.use(function(req, res, next) {
  res.header({
    "Access-Control-Allow-Headers": "x-access-token, Origin, Content-Type, Accept",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Origin": "*"
  });
  next();
});

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/teacher",
    [authJwt.verifyToken, authJwt.isTeacher],
    controller.teacherBoard
  );

  app.get(
    "/api/test/gestion",
    [authJwt.verifyToken, authJwt.isAdminOrTeacher],
    controller.gestionBoard
  );

};
