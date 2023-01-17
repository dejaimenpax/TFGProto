exports.allAccess = (req, res) => {
  res.status(200).send("Contenido para el que no hace falta iniciar sesión.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenido disponible para usuarios.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Contenido disponible para administradores.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Contenido disponible para moderadores.");
};
