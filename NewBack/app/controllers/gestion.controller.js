const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;


exports.deleteAccountByUsername = (req, res) => {
    const { username } = req.body;
  
    User.findOne({ username }) // Buscar al usuario por su username
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "Usuario no encontrado." });
        }
  
        if (username===user.teacher) {
          // Si el usuario es un profesor (tiene por username de profesor el suyo propio)
          User.deleteMany({ teacher: user.username}) // Eliminar a todos que tengan por username de profesor ese
            .then(() => {
              res.status(200).send({ message: "Profesor y alumnos asociados borrados con éxito." });
            })
            .catch((err) => {
              res.status(500).send({ message: err.message });
            });
  
        } else {
          // Si el usuario no es un profesor, eliminar directamente
          User.findOneAndDelete({ username })
            .then(() => {
              res.status(200).send({ message: "Usuario borrado con éxito." });
            })
            .catch((err) => {
              res.status(500).send({ message: err.message });
            });
        }
      })
      .catch((err) => {
        res.status(500).send({ message: err.message });
      });
};

exports.getAllUsersExceptAdmins = (req, res) => {
    User.find({})
      .populate({
        path: "roles",
        match: { $or: [{ name: "teacher" }, { name: "user" }] },
        select: "name"
      })
      .exec((err, users) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
  
        const filteredUsers = users.filter(user => user.roles.length > 0);
        const userAndTeacherusernames = filteredUsers.map(user => ({
          id: user._id,
          username: user.username,
          roles: user.roles
        }));
        
        console.log("El backend los devuelve asi", userAndTeacherusernames)
        res.status(200).send(userAndTeacherusernames);
      });
};

exports.getStudentsForGestion = (req, res) => {
  const token = req.headers["x-access-token"];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      User.find({ teacher: user.username, username: { $ne: user.username } })
        .then(students => {
          const filteredStudents = students.filter(user => user.roles.length > 0);
          const usernames = filteredStudents.map(user => ({
            id: user._id,
            username: user.username,
            roles: user.roles
          }));

          res.status(200).send(usernames);
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getListElement = (req, res) => {
  const { username } = req.query; // Access the username from req.query

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

