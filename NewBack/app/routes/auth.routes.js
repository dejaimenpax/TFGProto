const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

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
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.get("/api/auth/user", controller.getUser);

  app.get("/api/auth/teachers", controller.getTeachers)

  app.get("/api/auth/students", controller.getMyStudents)

  app.post("/api/auth/erase-stats", [authJwt.verifyToken], controller.eraseStats);

  app.delete("/api/auth/delete-account-byid", [authJwt.verifyToken], controller.deleteAccountById);
  
};
