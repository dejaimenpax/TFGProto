const EjGenerico = require('../EjGenerico')

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

module.exports = EjBloque1