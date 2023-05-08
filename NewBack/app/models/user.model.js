const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    submitted: [Number], //ejercicios donde se pulso resolver, estuviesen bien o mal (4 posiciones, una por bloque)
    correct: [Number], //cantidad de ejercicios resueltos correctamente (4 posiciones, una por bloque)
    incorrect: [Number], //cantidad de ejercicios resueltos incorrectamente (4 posiciones, una por bloque)
    scores: [Number], //puntuaciones totales por bloque
    averages: [Number], //puntuaciones medias por bloque
    
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
