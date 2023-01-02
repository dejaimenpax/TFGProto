//For environment variables
//require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

//For Mongo DB
//const Person = require('./models/exercises')


const app = express()

app.use(cors())
app.use(express.static('build'))

//aqui va la logica de crear los objetos

let exercises = [
    { 
        topic: "Matrix", 
        content: "This is content of an exercise",
        score: "10",
        id: 1
    },
    { 
        topic: "Matrix", 
        content: "This is content of an exercise",
        score: "5",
        id: 2
    },
    { 
        topic: "Functions", 
        content: "This is content of an exercise",
        score: "10",
        id: 3
    },
    {
        topic: "Geometry", 
        content: "This is content of an exercise",
        score: "20",
        id: 4
    }
]

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Página principal del backend</h1>')
})

app.get('/api/exercises', (request, response) => {
    response.json(exercises)
})
app.get('/api/info', (request, response) => {
    response.send(`<p>El prototipo tiene la información de ${exercises.length} ejercicios</p>` 
    + `${new Date()}`)
})

app.get('/api/exercises/:id', (request, response) => {
    console.log(request.params.id, typeof request.params.id)
    const id = Number(request.params.id)
    const exercise = exercises.find(x => x.id === id)
    
    if (exercise) { //if undefined is false
        response.json(exercise)
    } else {
        response.statusMessage = "There is no exercise with that number" //esto cambia el "NOT FOUND"
        response.status(404).end()
    }
})

app.delete('/api/exercises/:id', (request, response) => {
    console.log('Entra en delete')
    const id = Number(request.params.id)
    console.log(id)
    exercises = exercises.filter(x => x.id !== id)
  
    response.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 100000);
} 
  
app.post('/api/exercises', (request, response) => {
    console.log('Entra en post')
    const body = request.body
  
    if (!body.topic) {
      return response.status(400).json({ 
        error: 'topic missing'
      })
    }

    if (!body.content) {
        return response.status(400).json({ 
          error: 'content missing'
        })
      }

    if (!body.score) {
        return response.status(400).json({ 
          error: 'score missing'
        })
    }
    
    const exercise = {
        topic: body.topic,
        content: body.content,
        score: body.score,
        id: generateId()
    }

    //console.log(exercise)
    exercises = exercises.concat(exercise)
    //console.log('Concatenado!!!')

    response.json(exercise)
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})