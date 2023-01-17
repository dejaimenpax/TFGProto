const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateDniOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    dni: req.body.dni
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Error. El NIF/NIE ya se está utilizando por otro usuario." });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Error. El correo electrónico ya se está utilizando por otro usuario." });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Error. El rol especificado (${req.body.roles[i]}) no existe.`
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateDniOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
