const EjGenerico = require('../EjGenerico.js')
//import EjGenerico from '../EjGenerico.js'

class EjBloque1 extends EjGenerico{
    constructor (id_tema, texto, enunciado, puntuacion, id) {
        super("Bloque 1 - Números y operaciones",
            id_tema,
            texto, 
            enunciado,
            puntuacion, 
            id)
    }
}

//export default EjBloque1
module.exports = EjBloque1