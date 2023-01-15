const mongoose = require('mongoose')


if (process.argv.length!==3){
    console.log('Use: node mongo.js "Password"')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://tfg:<password>@cluster1.ox2jmnh.mongodb.net/?retryWrites=true&w=majority`

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
  
const Exercise = mongoose.model('Exercise', exerciseSchema)


mongoose
    .connect(url)
    .then((result) => {
        console.log('Ejercicios:')
        Exercise.find({}).then(result => {
            result.forEach(x => {
                console.log(`${x.tema} ${x.id}`)
            })
            mongoose.connection.close()
            })
    })
    .catch((err) => console.log(err))
