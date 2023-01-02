
const Filter = (props) => {
    return(
        <>
            <div>Filtrado por tema al que pertenece el ejercicio 
                <input
                    value={props.newFilter}
                    onChange={props.handleFilterChange}
                />
            </div>
        </>
        )
}

export default Filter

