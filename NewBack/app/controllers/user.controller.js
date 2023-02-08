exports.allAccess = (req, res) => {
  res.status(200).send("Contenido visible sin login.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenido dispoible tras login. Si lees esto, has hecho login");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Contenido disponible para administradores.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Contenido disponible para moderadores.");
}; 


