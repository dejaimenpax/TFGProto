const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    password: String,
    submitted: [Number], //ejercicios donde se pulso resolver, estuviesen bien o mal (4 posiciones, una por bloque)
    correct: [Number], //cantidad de ejercicios resueltos correctamente (4 posiciones, una por bloque)
    incorrect: [Number], //cantidad de ejercicios resueltos incorrectamente (4 posiciones, una por bloque)
    scores: [Number], //puntuaciones totales por bloque
    averages: [Number], //puntuaciones medias por bloque
    teacher: String, //username del profesor asociado. si es el mismo, coincide con su mail
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
