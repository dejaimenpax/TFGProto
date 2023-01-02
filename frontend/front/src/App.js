import { useState, useEffect} from 'react'
import Exercises from './Components/Exercises'
import Filter from './Components/Filter'
import ExerciseForm from './Components/ExerciseForm'
import Notification from './Components/Notification'

import exerciseService from './Services/Exercises'


const App = () => {
  const [exercises, setExercises] = useState([])
  const [newTopic, setNewTopic] = useState('')
  const [newContent, setNewContent] = useState('')
  const [newScore, setNewScore] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [feedbackType, setFeedBackType] = useState('')

  useEffect(() => {
    console.log('effect')
    exerciseService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setExercises(response.data)
      })
  }, [])
  console.log('render', exercises.length, 'exercises')
 

  const addExercise = (event) => {
    event.preventDefault()

    console.log('Add exercise button clicked', event.target)

    const exerciseObject = {
      topic: newTopic,
      content: newContent,
      score: newScore
    }

    exerciseService
      .create(exerciseObject)
      .then(x => {
        setFeedBackType('success')
        setFeedbackMessage(`Added ${newTopic}`)
        setTimeout(() => {
          setFeedbackMessage('')
          setFeedBackType('')
        }, 5000)
        setExercises(exercises.concat(x))
      })   

    setNewTopic('')
    setNewContent('')
    setNewScore('')
  }

  const handleTopicChange = (event) => {
    setNewTopic(event.target.value)
  }

  const handleContentChange = (event) => {
    setNewContent(event.target.value)
  }

  const handleScoreChange = (event) => {
    setNewScore(event.target.value)
  }


  const handleFilterChange = (event) => {
    const auxFilter = event.target.value.toLowerCase() //innecesario
    console.log(auxFilter)
    setNewFilter(auxFilter)
  }

  const eraseExercise = (exercise) => {
    console.log('Entra por el borrado')
    //mucho cuidado como llamamos en Exercise.js a esta funcion, debe ser como () => eraseExercise(id)
    if (window.confirm(`Delete ${exercise.id}?`)){
      exerciseService
      .erase(exercise.id)
      .then(response => {
        setExercises(exercises.filter(x => x.id!==exercise.id))
      })
    }
  }

  return (
    <>
      <h2>Lista de ejercicios</h2>
      
      <Notification message={feedbackMessage} type={feedbackType}/>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Añadir un nuevo ejercicio</h3>

      <ExerciseForm 
        addExercise={addExercise}
        newTopic={newTopic}
        handleTopicChange={handleTopicChange}
        newContent={newContent}
        handleContentChange={handleContentChange}
        newScore={newScore}
        handleScoreChange={handleScoreChange}
      />

      <h3>Listado de ejercicios</h3>

      <Exercises exercises={exercises} newFilter={newFilter} eraseExercise={eraseExercise} />

    </>
  )
}

export default App
