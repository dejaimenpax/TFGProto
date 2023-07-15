const mongoose = require("mongoose");

const Exercise = mongoose.model(
  "Exercise",
  new mongoose.Schema({
    name: String,
    id_tema: Number,
    flag_active: Boolean
  })
);

module.exports = Exercise;
