const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No hay token" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Se ha proporcionado un token, pero es inválido." });
    }
    req.userId = decoded.id;
    next();
  });
};

isTeacher = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "teacher") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Se requiere rol de profesor." });
        return;
      }
    );
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "admin") {
            next();
            return;
          }
        }

        res.status(403).send({ message: "Se requiere rol de administrador." });
        return;
      }
    );
  });
};

isAdminOrTeacher = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find(
      {
        _id: { $in: user.roles }
      },
      (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        // Check if the user has the role of "admin" or "teacher"
        const isAdminOrTeacher = roles.some(role => ["admin", "teacher"].includes(role.name));

        if (isAdminOrTeacher) {
          next();
        } else {
          res.status(403).send({ message: "Se requiere rol de administrador o profesor." });
        }
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isTeacher,
  isAdmin,
  isAdminOrTeacher
};
module.exports = authJwt;
