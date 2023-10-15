const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),

    submitted: [0,0,0,0],
    correct: [0,0,0,0], 
    incorrect: [0,0,0,0], 
    scores: [0,0,0,0], 
    averages: [0,0,0,0],
    teacher: req.body.teacher,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }


    Role.findOne({ name: req.body.role }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      user.roles = [role._id];
      user.save(err => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "El usuario se ha registrado correctamente." });
      });
    });

  });
};




exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Contraseña incorrecta."
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      res.cookie("token", token, {
        maxAge: 86400, // 24 hours
        httpOnly: true,
        secure: true // HTTPS sólo en producción
      });

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        submitted: user.submitted,
        correct: user.correct, 
        incorrect: user.incorrect, 
        scores: user.scores,
        teacher: user.teacher, 
        roles: authorities,
        accessToken: token
      });
    });
};

exports.getUser = (req, res) => {
  const token = req.headers["x-access-token"];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      res.status(200).send(user);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getTeachers = (req, res) => { 
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

      const teacherusernames = users
        .filter(user => user.roles.length > 0)
        .map(user => user.username);

      res.status(200).send(teacherusernames);
    });
};

exports.getMyStudents = (req, res) => {
  const token = req.headers["x-access-token"];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.id;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      User.find({ teacher: user.username, username: { $ne: user.username } })
        .then(students => {
          res.status(200).send(students);
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.getStudentsWithSameTeacher = (req, res) => {
  const token = req.headers["x-access-token"];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.id;

  // Buscar al usuario por el id
  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }

      // Obtener el valor de 'teacher' del usuario encontrado
      const teacher = user.teacher;

      // Buscar a los estudiantes con el mismo profesor (teacher)
      User.find({ teacher, username: { $ne: teacher } }, (err, students) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }

        // Ordenar la lista de estudiantes por puntuación total de mayor a menor
        students.sort((a, b) => {
          const totalScoreA = a.scores.reduce((acc, score) => acc + score, 0);
          const totalScoreB = b.scores.reduce((acc, score) => acc + score, 0);

          if (totalScoreB !== totalScoreA) {
            return totalScoreB - totalScoreA;
          }
          //en caso de igualdad de puntuación
          return a.username.localeCompare(b.username);
        });

        res.status(200).send(students);
      });

  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};



exports.eraseStats = (req, res) => {
  const token = req.headers["x-access-token"];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.id;

  User.findByIdAndUpdate(
    userId,
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
        return res.status(404).send({ message: "User not found." });
      }

      res.status(200).send({ message: "Stats erased successfully." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};


exports.deleteAccountById = (req, res) => {
  const token = req.headers["x-access-token"];
  const decodedToken = jwt.verify(token, config.secret);
  const userId = decodedToken.id;

  User.findByIdAndDelete(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      res.status(200).send({ message: "Account deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};



