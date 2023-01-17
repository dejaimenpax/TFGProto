const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    dni: String,
    email: String,
    password: String,
    scores: [Number], //puntuacion, 4 posiciones, una por cada bloque
    counters: [Number], //cantidad de ejercicios resuletos (4 posiciones)
    averages: [Number], //medias por cada bloque de ejercicios

    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
