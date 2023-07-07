const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Error. El nombre de usuario ya se está utilizando por otro usuario." });
      return;
    }

    next();
    // username
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.role) {
    if (!ROLES.includes(req.body.role)) {
      res.status(400).send({
        message: `Error. El rol especificado (${req.body.roles[i]}) no existe.`
      });
      return;
    }
    
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsername,
  checkRolesExisted
};

module.exports = verifySignUp;
