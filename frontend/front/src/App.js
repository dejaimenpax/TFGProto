import { useState, useEffect} from 'react'
import Ej3_4 from './Clases_front/Bloque1/Ej3_4'
import Ej6 from './Clases_front/Bloque1/Ej6'
import Exercises from './Components/Exercises'
import Filter from './Components/Filter'

import exerciseService from './Services/Exercises'


const App = () => {
  const [exercises, setExercises] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newInput, setNewInput] = useState('')

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
 
  const addInput = (exercise) => {
    //event.preventDefault()
    console.log("Entra por añadir input")


    let exerciseObject = null
    console.log("HE IDENTIFICADO QUE VAS A PUTEAR UN EJ3_4, TAL Y COMO INDICA EL ID", exercise.id_tema)

    switch (exercise.id_tema){
      case 1.03:
        exerciseObject = new Ej3_4(
          exercise.texto,
          exercise.enunciado,
          exercise.puntuacion,
          exercise.id
        )
        break;
      case 1.06:
        exerciseObject = new Ej6(
          exercise.texto,
          exercise.enunciado,
          exercise.puntuacion,
          exercise.id
        )
        break;
      default:
        break;
    }

    exerciseObject.resolver(newInput)
    setNewInput('')
    console.log("He quitado el newInput")


    console.log("El id es", exerciseObject.id)


      
    exerciseService
      .update(exercise.id, exerciseObject)
      .then(response => {
        console.log("Entra por then")
        setExercises(exercises.map(x=> x.id!==exercise.id ? x : response.data))
      })
  
    setNewInput('')
  }
  

  const handleInputChange = (event) => {
    //event.preventDefault()
    setNewInput(event.target.value)
  }

  const handleFilterChange = (event) => {
    const auxFilter = event.target.value.toLowerCase() //innecesario
    console.log(auxFilter)
    setNewFilter(auxFilter)
  }

  return (
    <>
      <h1>Aprende matemáticas</h1>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h3>Listado de ejercicios</h3>

      <Exercises 
        exercises={exercises} 
        newFilter={newFilter} 
        addInput={addInput} 
        handleInputChange={handleInputChange}
      />

    </>
  )
}

export default App
