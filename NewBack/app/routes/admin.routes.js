const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/admin.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.delete("/api/admin/delete-account-byUsername", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteAccountByUsername);

  app.get("/api/admin/all-users", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllUsersExceptAdmins);
  
};