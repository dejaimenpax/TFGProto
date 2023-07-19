const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/gestion.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header({
      "Access-Control-Allow-Headers": "x-access-token, Origin, Content-Type, Accept",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Origin": "*"
    });
    next();
  });

  app.delete("/api/gestion/delete-account-byUsername", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.deleteAccountByUsername);

  app.get("/api/gestion/all-users", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.getAllUsersExceptAdmins);

  app.get("api/gestion/students-for-gestion", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.getStudentsForGestion);
  
};