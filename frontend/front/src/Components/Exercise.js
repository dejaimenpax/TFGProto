
const Exercise = ({ exercise, addInput, newInput, handleInputChange }) => {
    return(
        <div>
        Tema:{exercise.tema}_Texto:{exercise.texto}
            <div>Introduce tu respuesta al ejercicio: 
                <input 
                    value={newInput}
                    onChange={handleInputChange}
                />
            </div>

            <div><button onClick={() => addInput(exercise)}>Enviar</button></div>

        
        </div>
    )
}

export default Exercise