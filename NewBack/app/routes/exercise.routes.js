const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const Ej6 = require("../Clases_back/Bloque1/Ej6") 

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  })

  app.post('/api/exercise/create', (req, res) => {
    const { id_tema } = req.body // assume the number is passed as a JSON object with a "id_tema" property
    const ex6 = new Ej6("Texto", "374583 298769", 40) // create a new Ex6 object with the given number
    res.json(ex6) // return the Ex6 object as JSON
  })

  app.post('/api/exercise/resolve', (req, res) => {
    const { exercise, input } = req.body // assume the exercise is passed as a JSON object with a "exercise" an "inpu" propierty
    const exAux = new Ej6(exercise.texto, exercise.enunciado, exercise.puntuacion)
    exAux.resolver(input)
    res.json(exAux) // return the Ex6 object as JSON
  })

  

}
