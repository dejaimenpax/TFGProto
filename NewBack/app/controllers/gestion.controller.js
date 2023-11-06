const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var bcrypt = require("bcryptjs");


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

exports.getUsersExceptAdmins = (req, res) => {

  const { username } = req.query; // Access the username from req.query

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      if (user.username===user.teacher){
        // Si el usuario es un profesor (tiene por username de profesor el suyo propio)
        User.find({ teacher: user.username, username: { $ne: user.username } })
          .populate({
            path: "roles",
            match: { $or: [{ name: "teacher" }, { name: "user" }] },
            select: "name"
          })
          .exec((err, students) => {
            if (err) {
              res.status(500).send({ message: err.message });
              return;
            }

            const studentUsernames = students.map(student => ({
              id: student._id,
              username: student.username,
              teacher: student.teacher,
              roles: student.roles
            }));
            res.status(200).send(studentUsernames);
        });
      }

      else{

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
              teacher: user.teacher,
              roles: user.roles
            }));
            
            res.status(200).send(userAndTeacherusernames);
        });

      }


    })
    .catch((err) => {
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

exports.getTeachers = (req, res) => {

  const { username } = req.query; // Access the username from req.query

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      User.find({})
      .populate({
        path: "roles",
        match: { name: "teacher" },
        select: "name"
      })
      .exec((err, users) => {
        if (err) {
          res.status(500).send({ message: err.message });
          return;
        }
  
        let teacherusernames = users
          .filter(us => us.roles.length > 0)
          .map(us => us.username);
        
        if (user.username===user.teacher){
          teacherusernames = teacherusernames.filter(x => x===user.username)
        }
        res.status(200).send(teacherusernames);
      });


    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
  });
 
};

exports.eraseUserStats = (req, res) => {
  const { username } = req.body;

  User.findOneAndUpdate(
    { username: username },
    {
      submitted: [0, 0, 0, 0],
      correct: [0, 0, 0, 0],
      incorrect: [0, 0, 0, 0],
      scores: [0, 0, 0, 0],
      averages: [0, 0, 0, 0],
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      res.status(200).send({ message: "Estadísticas borradas con éxito." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
  
}

exports.restorePassword = (req, res) => {

  User.findOneAndUpdate(
    { username: req.body.username },
    {
      password: bcrypt.hashSync(req.body.password, 8),
    },
    { new: true }
  )
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado." });
    }

    res.status(200).send({ message: "Contraseña restablecida con éxito." });
  })
  .catch((err) => {
    res.status(500).send({ message: err.message });
  });


}

