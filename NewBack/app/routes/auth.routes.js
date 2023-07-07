const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods",
      "x-access-token, Origin, Content-Type, Accept"
    );
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

  app.delete("/api/auth/delete-account-byUsername", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteAccountByUsername);

  app.get("/api/auth/all-users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsersExceptAdmins);
  
};
