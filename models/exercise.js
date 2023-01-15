const mongoose = require('mongoose')

const url = 'mongodb+srv://tfg:689408840@cluster1.ox2jmnh.mongodb.net/?retryWrites=true&w=majority'

console.log('connecting to', url)
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const exerciseSchema = new mongoose.Schema({
    tema: String,
    id_tema: Number,
    texto: String,
    enunciado: String,
    input: String, //el input lo mete resolver
    resultado: Array, //array de la misma longitud que input
    explicacion: Array, //array de la misma longitud que input
    puntuacion: Number,
    nota: Number,
    //id no se pone
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Exercise', exerciseSchema)