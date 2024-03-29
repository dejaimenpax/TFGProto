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

  app.get("/api/gestion/getUsersExceptAdmins", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.getUsersExceptAdmins);
  
  app.get("/api/gestion/getListElement", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.getListElement)

  app.get("/api/gestion/getTeachers", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.getTeachers)

  app.post("/api/gestion/eraseUserStats", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.eraseUserStats)

  app.post("/api/gestion/restorePassword", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.restorePassword)
  
  app.post("/api/gestion/updateRankingVisibility", [authJwt.verifyToken, authJwt.isAdminOrTeacher], controller.updateRankingVisibility)
};