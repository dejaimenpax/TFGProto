exports.allAccess = (req, res) => {
  res.status(200).send("Contenido visible sin login.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenido disponible para alumnos logados.");
};

exports.teacherBoard = (req, res) => {
  res.status(200).send("Contenido disponible para profesores.");
};



